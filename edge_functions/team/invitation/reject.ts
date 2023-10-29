import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_rejectInvitation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  _user_id: string
) => {
  // Extract data from body
  const { invitation_id } = JSON.parse(req.body);

  const { data: data_Delete, error: error_Delete } = await supabaseServerClient
    .from('teams_invitations')
    .delete()
    .match({ invitation_id });

  // Handle error_Delete
  if (error_Delete) return res.status(400).json({ error: true, message: error_Delete.message, data: null });

  res.status(200).json({ error: false, message: 'Invitation rejected', data: data_Delete });
};
