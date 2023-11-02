import { TIER_LIMITS } from '@khofly/core';
import { ContextWithAuth } from '../../../lib/supabaseUser';

interface CtxBody {
  name: string;
}

// POST - /team
export const handleTeamCreate = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Extract data from body
  const { name } = JSON.parse(ctx.body as string) as CtxBody;

  // Fetch all teams
  const { data: data_MyTeams, error: error_MyTeams } = await supabase
    .from('teams')
    .select('id')
    .match({ admin_id: user_id });

  // Handle error_GET
  if (error_MyTeams) {
    ctx.set.status = 400;
    return { error: true, message: error_MyTeams.message, data: null };
  }

  // Check tier availability
  if (!TIER_LIMITS[user_tier].canCreateTeam) {
    ctx.set.status = 400;
    return { error: true, message: 'Insufficient tier', data: null };
  }

  // Max X teams per account
  if (data_MyTeams.length >= TIER_LIMITS[user_tier].teamNoLimit) {
    ctx.set.status = 400;
    return { error: true, message: 'Team limit reached', data: null };
  }

  // Create new team
  const { data: data_newTeam, error: error_NewTeam } = await supabase
    .from('teams')
    .insert({ name, admin_id: user_id })
    .select();

  // Handle error_NewTeam
  if (error_NewTeam) {
    ctx.set.status = 400;
    return { error: true, message: error_NewTeam.message, data: null };
  }

  // Add admin user
  const { error: error_NewUser } = await supabase
    .from('teams_users')
    .insert({ user_id: user_id, team_id: data_newTeam[0].id });

  // Handle error_NewUser
  if (error_NewUser) {
    ctx.set.status = 400;
    return { error: true, message: error_NewUser.message, data: null };
  }

  return { error: false, message: 'Your team was successfully created', data: null };
};
