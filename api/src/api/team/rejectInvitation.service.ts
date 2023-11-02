import { ContextWithAuth } from '../../../lib/supabaseUser';

interface CtxBody {
  invitation_id: string;
}

// POST - /team
export const handleInvitationReject = async (ctx: ContextWithAuth) => {
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

  const { data: data_Delete, error: error_Delete } = await supabase
    .from('teams_invitations')
    .delete()
    .match({ invitation_id });

  // Handle error_Delete
  if (error_Delete) {
    ctx.set.status = 400;
    return { error: true, message: error_Delete.message, data: null };
  }

  return { error: false, message: 'Invitation rejected', data: data_Delete };
};
