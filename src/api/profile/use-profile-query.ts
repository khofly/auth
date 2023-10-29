import { IProfile } from '@fossly/core';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

export const useProfileQuery = (): { profile: IProfile; isLoading: boolean } => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: async () => {
      if (!user) return null;

      let { data, error, status } = await supabase.from('profiles').select(`*`).eq('id', user.id).single();

      if (error && status !== 406) return null;

      return (data as IProfile) || null;
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user && !data) refetch();
  }, [user]);

  return { profile: data, isLoading };
};
