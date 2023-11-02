import { useGlobalStore } from '@store/global';
import { useSupabaseStore } from '@store/supabase';

import { useEffect } from 'react';

export const useApiTier = () => {
  const { supabaseClient } = useSupabaseStore((state) => ({ supabaseClient: state.supabaseClient }));

  const { profile, setTier } = useGlobalStore((state) => ({
    profile: state.profile,
    setTier: state.setTier,
  }));

  useEffect(() => {
    const fetchTier = async () => {
      if (!profile) return;

      let { data, error, status } = await supabaseClient
        .from('tiers')
        .select(`*`)
        .eq('user_id', profile.id)
        .single();

      if (error && status !== 406) return;

      setTier(data?.value || 1);
    };
    fetchTier();
  }, [profile]);
};
