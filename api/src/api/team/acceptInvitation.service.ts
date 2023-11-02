import { ContextWithAuth } from '../../../lib/supabaseUser';

interface CtxBody {
  invitation_id: string;
}

// POST - /team
export const handleInvitationAccept = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Extract data from body
  const { invitation_id } = JSON.parse(ctx.body as string) as CtxBody;

  // Remove invitation
  const { data: data_DeleteInvitation, error: error_DeleteInvitation } = await supabase
    .from('teams_invitations')
    .delete()
    .match({ id: invitation_id })
    .select();

  // Handle error_DeleteInvitation
  if (error_DeleteInvitation) {
    ctx.set.status = 400;
    return { error: true, message: error_DeleteInvitation.message, data: null };
  }
  // Add team member
  const { error: error_AddMember } = await supabase
    .from('teams_users')
    .insert({ user_id, team_id: data_DeleteInvitation[0].team_id });

  // Handle error_AddMember
  if (error_AddMember) {
    ctx.set.status = 400;
    return { error: true, message: error_AddMember.message, data: null };
  }
  return { error: false, message: 'Invitation accepted', data: null };
};
