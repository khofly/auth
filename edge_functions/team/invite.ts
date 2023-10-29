import { ITiers, TIER_LIMITS } from '@fossly/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_inviteUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string,
  user_tier: ITiers
) => {
  // Extract data from body
  const { team_id: team_id, user_id: invited_user_id } = JSON.parse(req.body);

  if (user_id === invited_user_id)
    return res.status(400).json({ error: true, message: 'Invalid ID', data: null });

  // Find invited user
  const { data: data_InvitedUser, error: error_InvitedUser } = await supabaseServerClient
    .from('profiles')
    .select('id')
    .match({ id: invited_user_id });

  if (error_InvitedUser || !data_InvitedUser.length)
    return res.status(400).json({ error: true, message: 'User not found', data: null });

  // Fetch all members for team
  const { data: data_TeamUsers, error: error_TeamUsers } = await supabaseServerClient
    .from('teams_users')
    .select('id')
    .match({ team_id });

  // Handle error_TeamUsers
  if (error_TeamUsers)
    return res.status(400).json({ error: true, message: error_TeamUsers.message, data: null });

  // Fetch all invited users for team
  const { data: data_TeamInvitations, error: error_TeamInvitations } = await supabaseServerClient
    .from('teams_invitations')
    .select('id')
    .match({ team_id });

  // Handle error_TeamInvitations
  if (error_TeamInvitations)
    return res.status(400).json({ error: true, message: error_TeamInvitations.message, data: null });

  const allPotentialMembers = [...data_TeamUsers, ...data_TeamInvitations];

  // Max X members per team
  if (allPotentialMembers.length >= TIER_LIMITS[user_tier].teamLenLimit)
    return res.status(400).json({ error: true, message: 'Team members limit reached', data: null });

  // Create an invitation
  // TODO: Send a mail, maybe in the future
  const { data: data_Invitation, error: error_Invitation } = await supabaseServerClient
    .from('teams_invitations')
    .insert({ team_id, user_id: invited_user_id });

  // Handle error_Invitation
  if (error_Invitation)
    return res.status(400).json({ error: true, message: error_Invitation.message, data: null });

  return res.status(200).json({ success: true, message: 'User invited successfully', data: null });
};
