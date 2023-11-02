import dayjs from 'dayjs';
import { ContextWithAuth } from '../../../lib/supabaseUser';

interface CtxBody {
  avatar_url: string;
}

// POST - /team
export const handleChangeAvatar = async (ctx: ContextWithAuth) => {
  // User ID & Client
  const user_id = ctx.user_id;
  const user_tier = ctx.tier;
  const supabase = ctx.supabaseClient;

  if (!user_id || !user_tier) {
    ctx.set.status = 401;
    return { error: true, message: 'Unauthorized!', data: null };
  }

  // Extract data from body
  const { avatar_url } = JSON.parse(ctx.body as string) as CtxBody;

  // Handle no data
  if (!avatar_url) {
    ctx.set.status = 400;
    return { error: true, message: 'No data', data: null };
  }

  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url, updated_at: dayjs().toString() })
    .match({ id: user_id });

  // Handle error
  if (error) {
    ctx.set.status = 400;
    return { error: true, message: error.message, data: null };
  }

  return { error: false, message: 'Profile avatar updated successfully', data: null };
};
