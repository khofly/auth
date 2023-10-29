import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_acceptInvitation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string
) => {
  // Extract data from body
  const { invitation_id } = JSON.parse(req.body);

  // Remove invitation
  const { data: data_DeleteInvitation, error: error_DeleteInvitation } = await supabaseServerClient
    .from('teams_invitations')
    .delete()
    .match({ id: invitation_id })
    .select();

  // Handle error_DeleteInvitation
  if (error_DeleteInvitation)
    return res.status(400).json({ error: true, message: error_DeleteInvitation.message, data: null });

  // Add team member
  const { error: error_AddMember } = await supabaseServerClient
    .from('teams_users')
    .insert({ user_id, team_id: data_DeleteInvitation[0].team_id });

  // Handle error_AddMember
  if (error_AddMember)
    return res.status(400).json({ error: true, message: error_AddMember.message, data: null });

  return res.status(200).json({ success: true, message: 'Invitation accepted', data: null });
};
