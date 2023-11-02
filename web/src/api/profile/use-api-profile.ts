import { useSupabaseStore } from '@store/supabase';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { useGlobalStore } from 'src/store/global';

// Sets user profile
const useApiProfile = () => {
  // const supabaseClient = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  // const [session, setSession] = useState<Session | null>(null);

  const { supabaseClient } = useSupabaseStore((state) => ({ supabaseClient: state.supabaseClient }));

  const { setProfile, setSession, session } = useGlobalStore((state) => ({
    setSession: state.setSession,
    setProfile: state.setProfile,
    session: state.session,
  }));

  useEffect(() => {
    if (!supabaseClient) return;

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [supabaseClient]);

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
