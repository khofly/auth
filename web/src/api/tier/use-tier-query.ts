import { ITiers } from '@khofly/core';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export const useTierQuery = (): { tier: ITiers; isLoading: boolean } => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.TIER],
    queryFn: async () => {
      if (!user) return null;

      let { data, error, status } = await supabase.from('tiers').select(`*`).eq('user_id', user.id).single();

      if (error && status !== 406) return 1;

      return data?.value || 1;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user && !data) refetch();
  }, [user]);

  return { tier: data, isLoading };
};
