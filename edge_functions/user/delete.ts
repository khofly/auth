import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export const userApi_deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerAdmin = createServerSupabaseClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE,
    }
  );

  // Fetch logged in user
  const { data: data1, error: error1 } = await supabaseServerAdmin.auth.getUser();

  // Handle error1
  if (error1 || !data1) return res.status(400).json({ error: true, message: 'No user found', data: null });

  // Delete user account
  const { error: error2 } = await supabaseServerAdmin.auth.admin.deleteUser(data1.user.id);

  // Handle error2
  if (error2) return res.status(400).json({ error: true, message: error2.message, data: null });

  return res.status(200).json({ error: false, message: 'Your data was successfully removed', data: null });
};
