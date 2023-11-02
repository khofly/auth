import { Context, Elysia } from 'elysia';
import { supabase } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { ITiers } from '@khofly/core';

export const supabaseUser = (app: Elysia) =>
  app.derive(async ({ request }) => {
    const access_token = request.headers.get('authorization')?.split(' ')[1];
    const refresh_token = request.headers.get('sb-refresh-token');

    // const { data, error } = await supabase.auth.getUser(access_token);

    // if (data.user)
    //   return {
    //     userId: data.user.id,
    //     supabaseClient: supabase,
    //   };

    const { data: session, error: sessionError } = await supabase.auth.setSession({
      access_token: access_token || '',
      refresh_token: refresh_token || '',
    });

    if (sessionError) throw sessionError;

    // Fetch user tier
    const { data: tierData, error: tierError } = await supabase
      .from('tiers')
      .select('value')
      .match({ user_id: session?.user?.id });

    // Handle error_Tier
    if (tierError) throw tierError;

    return {
      user_id: session.user!.id,
      tier: tierData[0].value,
      supabaseClient: supabase,
    };
  });

export interface ContextWithAuth extends Context {
  user_id: string | number;
  tier: ITiers;
  supabaseClient: SupabaseClient;
}
