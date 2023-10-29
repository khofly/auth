import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import useAuthCtx from './auth/use-auth-ctx';

const SupabaseCTXProvider = ({ children, initialSession }) => {
  const { cookieDomain } = useAuthCtx();

  const domain = cookieDomain || 'fossly.tech';

  console.log(cookieDomain);

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      cookieOptions: {
        domain: cookieDomain,
        // domain: process.env.NODE_ENV === 'development' ? 'localhost' : domain,
        maxAge: '100000000', // ~ 1day
        path: '/',
        sameSite: 'Lax',
        secure: 'secure',
      },
    })
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseCTXProvider;
