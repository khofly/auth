import { ContextWithAuth } from '../../../lib/supabaseUser';

// POST - /team
export const handleUserInvitationsSelect = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Fetch user teams
  const { data: data_MyTeams, error: error_MyTeams } = await supabase
    .from('teams_invitations')
    .select(
      `
      *,
      team:team_id(
        name, 
        admin:admin_id(
            avatar_url, 
            display_name
        )
      )
    `
    )
    .match({ user_id });

  // Handle error_GET
  if (error_MyTeams) {
    ctx.set.status = 400;
    return { error: true, message: error_MyTeams.message, data: null };
  }

  return { error: false, message: 'Teams retrieved', data: [...data_MyTeams] };
};
