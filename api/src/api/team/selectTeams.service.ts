import { ContextWithAuth } from '../../../lib/supabaseUser';

// POST - /team
export const handleTeamsSelect = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Fetch all teams
  const { data: data_AllTeamsIds, error: error_AllTeamsIds } = await supabase
    .from('teams_users')
    .select('team_id')
    .match({ user_id: user_id });

  // Handle error_AllTeamsIds
  if (error_AllTeamsIds) {
    ctx.set.status = 400;
    return { error: true, message: error_AllTeamsIds.message, data: null };
  }

  const { data: data_AllMyTeams, error: error_AllMyTeams } = await supabase
    .from('teams')
    .select(
      `
   *,
   admin:admin_id(avatar_url, display_name)
 `
    )
    .in(
      'id',
      data_AllTeamsIds.map((t) => `${t.team_id}`)
    );

  // Handle error_AllMyTeams
  if (error_AllMyTeams) {
    ctx.set.status = 400;
    return { error: true, message: error_AllMyTeams.message, data: null };
  }

  return { error: false, message: 'Teams retrieved', data: data_AllMyTeams };
};
