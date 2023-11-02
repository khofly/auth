import dayjs from 'dayjs';
import { ContextWithAuth } from '../../../lib/supabaseUser';

interface CtxBody {
  display_name: string;
}

// POST - /team
export const handleChangeName = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Extract data from body
  const { display_name } = JSON.parse(ctx.body as string) as CtxBody;

  // Handle no data
  if (!display_name) {
    ctx.set.status = 400;
    return { error: true, message: 'No data', data: null };
  }

  const { error } = await supabase
    .from('profiles')
    .update({ display_name, updated_at: dayjs().toString() })
    .match({ id: user_id });

  // Handle error
  if (error) {
    ctx.set.status = 400;
    return { error: true, message: error.message, data: null };
  }

  return { error: false, message: 'Display name updated successfully', data: null };
};
