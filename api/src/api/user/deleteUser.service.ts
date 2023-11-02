import { createClient } from '@supabase/supabase-js';
import { ContextWithAuth } from '../../../lib/supabaseUser';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = process.env;

// POST - /team
export const handleUserDelete = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;

  const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Delete user account
  const { error } = await supabaseAdmin.auth.admin.deleteUser(`${user_id}`);

  // Handle error
  if (error) {
    ctx.set.status = 400;
    return { error: true, message: error.message, data: null };
  }

  return { error: false, message: 'Your data was successfully removed', data: null };
};
