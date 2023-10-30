import { useEffect } from 'react';
import { useAuthStore } from '..';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useAuthLogic = () => {
  const { redirectTo, setCookieDomain, setRedirectTo } = useAuthStore((state) => ({
    redirectTo: state.redirectTo,
    setCookieDomain: state.setCookieDomain,
    setRedirectTo: state.setRedirectTo,
  }));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const newRedirectTo = searchParams.get('redirectTo') as string;
    const newCookieDomain = searchParams.get('cookieDomain') as string;

    if (!redirectTo && newRedirectTo) {
      setRedirectTo(newRedirectTo);
      setCookieDomain(newCookieDomain);

      router.replace(pathname, { scroll: false });
    }
  }, [pathname]);

  return null;
};
