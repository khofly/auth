import { useEffect } from 'react';
import { useAuthStore } from '@store/auth';
import { useSupabaseStore } from '..';
import { createClient } from '@supabase/supabase-js';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const useSupabaseLogic = () => {
  const { cookieDomain } = useAuthStore((state) => ({
    cookieDomain: state.cookieDomain,
  }));

  const { supabaseClient, setSupabaseClient } = useSupabaseStore((state) => ({
    supabaseClient: state.supabaseClient,
    setSupabaseClient: state.setSupabaseClient,
  }));

  useEffect(() => {
    if (!supabaseClient) {
      const newClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            storage: {
              getItem(key) {
                return getCookie(key);
              },
              setItem(key, value) {
                return setCookie(key, value, {
                  domain: process.env.NODE_ENV === 'development' ? 'localhost' : cookieDomain,
                  httpOnly: false,
                  sameSite: 'lax',
                  maxAge: 60 * 60 * 24 * 1, // ~ 1day
                  path: '/',
                  secure: process.env.NEXT_PUBLIC_HOST.startsWith('https://'),
                });
              },
              removeItem(key) {
                return deleteCookie(key);
              },
            },
            // storageKey: 'sb-something',
          },
        }
      );

      setSupabaseClient(newClient);
    }
  }, [cookieDomain]);

  return null;
};
