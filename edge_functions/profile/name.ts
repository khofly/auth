import { ITiers } from '@fossly/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

export const profileApi_changeDisplayName = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseServerClient: SupabaseClient,
  user_id: string,
  _user_tier: ITiers
) => {
  // Extract data from body
  const { display_name } = JSON.parse(req.body);

  // Handle no data
  if (!display_name) return res.status(400).json({ error: true, message: 'No data', data: null });

  const { error } = await supabaseServerClient
    .from('profiles')
    .update({ display_name, updated_at: dayjs().toString() })
    .match({ id: user_id });

  // Handle error
  if (error) return res.status(400).json({ error: true, message: error.message, data: null });

  return res.status(200).json({ success: true, message: 'Display name updated successfully', data: null });
};
