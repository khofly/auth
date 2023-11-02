import { ContextWithAuth } from '../../../lib/supabaseUser';

// POST - /team
export const handleTeamUsersSelect = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Get id from quert
  const team_id = ctx.query?.['team_id'];

  if (!team_id) {
    ctx.set.status = 400;
    return { error: true, message: 'No team id', data: [] };
  }

  // Fetch user teams
  const { data: data_TeamUsers, error: error_TeamUsers } = await supabase
    .from('teams_users')
    .select(
      `
      *,
      user:user_id(avatar_url, display_name, email)
    `
    )
    .match({ team_id });

  // Handle error_TeamUsers
  if (error_TeamUsers) {
    ctx.set.status = 400;
    return { error: true, message: error_TeamUsers.message, data: null };
  }

  return { error: false, message: 'Teams retrieved', data: data_TeamUsers };
};
