import { TIER_LIMITS } from '@khofly/core';
import { ContextWithAuth } from '../../../lib/supabaseUser';

interface CtxBody {
  team_id: string;
  user_id: string;
}

// POST - /team
export const handleInvitationCreate = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Extract data from body
  const { team_id: team_id, user_id: invited_user_id } = JSON.parse(ctx.body as string) as CtxBody;

  if (user_id === invited_user_id) {
    ctx.set.status = 400;
    return { error: true, message: 'Invalid ID', data: null };
  }

  // Find invited user
  const { data: data_InvitedUser, error: error_InvitedUser } = await supabase
    .from('profiles')
    .select('id')
    .match({ id: invited_user_id });

  if (error_InvitedUser || !data_InvitedUser.length) {
    ctx.set.status = 400;
    return { error: true, message: 'User not found', data: null };
  }

  // Fetch all members for team
  const { data: data_TeamUsers, error: error_TeamUsers } = await supabase
    .from('teams_users')
    .select('id')
    .match({ team_id });

  // Handle error_TeamUsers
  if (error_TeamUsers) {
    ctx.set.status = 400;
    return { error: true, message: error_TeamUsers.message, data: null };
  }

  // Fetch all invited users for team
  const { data: data_TeamInvitations, error: error_TeamInvitations } = await supabase
    .from('teams_invitations')
    .select('id')
    .match({ team_id });

  // Handle error_TeamInvitations
  if (error_TeamInvitations) {
    ctx.set.status = 400;
    return { error: true, message: error_TeamInvitations.message, data: null };
  }
  const allPotentialMembers = [...data_TeamUsers, ...data_TeamInvitations];

  // Max X members per team
  if (allPotentialMembers.length >= TIER_LIMITS[user_tier].teamLenLimit) {
    ctx.set.status = 400;
    return { error: true, message: 'Team members limit reached', data: null };
  }

  // Create an invitation
  // TODO: Send a mail, maybe in the future
  const { data: data_Invitation, error: error_Invitation } = await supabase
    .from('teams_invitations')
    .insert({ team_id, user_id: invited_user_id });

  // Handle error_Invitation
  if (error_Invitation) {
    ctx.set.status = 400;
    return { error: true, message: error_Invitation.message, data: null };
  }

  return { error: false, message: 'User invited successfully', data: null };
};
