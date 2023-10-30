import { ITiers, TIER_LIMITS } from '@khofly/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export const teamApi_createTeam = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string,
  user_tier: ITiers
) => {
  // Extract data from body
  const { name } = JSON.parse(req.body);

  // Fetch all teams
  const { data: data_MyTeams, error: error_MyTeams } = await supabaseServerClient
    .from('teams')
    .select('id')
    .match({ admin_id: user_id });

  // Handle error_GET
  if (error_MyTeams) return res.status(400).json({ error: true, message: error_MyTeams.message, data: null });

  // Check tier availability
  if (!TIER_LIMITS[user_tier].canCreateTeam)
    return res.status(400).json({ error: true, message: 'Insufficient tier', data: null });

  // Max X teams per account
  if (data_MyTeams.length >= TIER_LIMITS[user_tier].teamNoLimit)
    return res.status(400).json({ error: true, message: 'Team limit reached', data: null });

  // Create new team
  const { data: data_newTeam, error: error_NewTeam } = await supabaseServerClient
    .from('teams')
    .insert({ name, admin_id: user_id })
    .select();

  // Handle error_NewTeam
  if (error_NewTeam) return res.status(400).json({ success: false, message: error_NewTeam.message });

  // Add admin user
  const { error: error_NewUser } = await supabaseServerClient
    .from('teams_users')
    .insert({ user_id: user_id, team_id: data_newTeam[0].id });

  // Handle error_NewUser
  if (error_NewUser) return res.status(400).json({ success: false, message: error_NewUser.message });

  return res.status(200).json({ success: true, message: 'Your team was successfully created' });
};
