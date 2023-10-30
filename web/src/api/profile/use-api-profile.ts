import { createBrowserClient } from '@supabase/ssr';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useGlobalStore } from 'src/store/global';

// Sets user profile
const useApiProfile = () => {
  const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [session, setSession] = useState<Session | null>(null);

  const { setProfile } = useGlobalStore();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return setProfile(null);

      let { data, error, status } = await supabaseClient
        .from('profiles')
        .select(`*`)
        .eq('id', session.user.id)
        .single();

      if (error && status !== 406) return setProfile(null);

      setProfile(data);
    };
    fetchProfile();
  }, [session]);
};

export { useApiProfile };
