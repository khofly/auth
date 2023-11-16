import { useEffect } from 'react';
import { useAuthStore } from '@store/auth';
import { useSupabaseStore } from '..';
import { createClient } from '@supabase/supabase-js';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const useSupabaseLogic = () => {
  const { redirectTo, setCookieDomain, setRedirectTo } = useAuthStore((state) => ({
    redirectTo: state.redirectTo,
    setRedirectTo: state.setRedirectTo,
    setCookieDomain: state.setCookieDomain,
  }));

  const { supabaseClient, setSupabaseClient } = useSupabaseStore((state) => ({
    supabaseClient: state.supabaseClient,
    setSupabaseClient: state.setSupabaseClient,
  }));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const newRedirectTo = searchParams.get('redirectTo') as string;
    const newCookieDomain = searchParams.get('cookieDomain') as string;

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
                domain: process.env.NODE_ENV === 'development' ? 'localhost' : newCookieDomain,
                maxAge: 60 * 60 * 24 * 1, // ~ 1 day
                path: '/',
                sameSite: 'lax',
                // secure: redirectTo?.startsWith('https://'),
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

    if (!supabaseClient) setSupabaseClient(newClient);

    if (!redirectTo && newRedirectTo) {
      setRedirectTo(newRedirectTo);
      setCookieDomain(newCookieDomain);

      router.replace(pathname, { scroll: false });
    }
  }, [pathname]);

  return null;
};
