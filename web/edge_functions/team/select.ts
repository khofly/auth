import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_selectTeams = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string
) => {
  // Fetch all teams
  const { data: data_AllTeamsIds, error: error_AllTeamsIds } = await supabaseServerClient
    .from('teams_users')
    .select('team_id')
    .match({ user_id: user_id });

  // Handle error_AllTeamsIds
  if (error_AllTeamsIds)
    return res.status(400).json({ error: true, message: error_AllTeamsIds.message, data: null });

  const { data: data_AllMyTeams, error: error_AllMyTeams } = await supabaseServerClient
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
  if (error_AllMyTeams)
    return res.status(400).json({ error: true, message: error_AllMyTeams.message, data: null });

  return res.status(200).json({ success: true, message: 'Teams retrieved', data: data_AllMyTeams });
};
