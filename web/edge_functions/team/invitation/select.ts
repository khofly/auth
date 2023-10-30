import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_selectInvitations = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string
) => {
  // Fetch user teams
  const { data: data_MyTeams, error: error_MyTeams } = await supabaseServerClient
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
  if (error_MyTeams) return res.status(400).json({ error: true, message: error_MyTeams.message, data: null });

  return res.status(200).json({ success: true, message: 'Teams retrieved', data: [...data_MyTeams] });
};
