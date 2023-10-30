import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_selectTeamUsers = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string
) => {
  const team_id = req.query?.['team_id'];

  if (!team_id) return res.status(400).json({ error: true, message: 'No team id', data: [] });

  // Fetch user teams
  const { data: data_TeamUsers, error: error_TeamUsers } = await supabaseServerClient
    .from('teams_users')
    .select(
      `
      *,
      user:user_id(avatar_url, display_name, email)
    `
    )
    .match({ team_id });

  // Handle error_TeamUsers
  if (error_TeamUsers)
    return res.status(400).json({ error: true, message: error_TeamUsers.message, data: null });

  return res.status(200).json({ success: true, message: 'Teams retrieved', data: data_TeamUsers });
};
