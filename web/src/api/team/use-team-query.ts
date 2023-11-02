import { IApiResponse, ITeam } from '@khofly/core';

import useFetch from '../use-fetch';
import { useGlobalStore } from '@store/global';
import useSWR from 'swr';
import useToast from '@hooks/use-toast';

export interface ITeamWithAdmin extends ITeam {
  admin: {
    avatar_url: string;
    display_name: string;
  };
}

export const useTeamsSWR = () => {
  const { session } = useGlobalStore((state) => ({
    session: state.session,
  }));
  const { toast } = useToast();

  const { fetchData } = useFetch();

  const fetcher = async (key) => {
    const res = await fetchData(key, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
        'SB-Refresh-Token': session?.refresh_token || '',
      },
    });

    if (res?.error) toast.show({ title: 'Teams error', message: res?.message, color: 'red' });

    return res?.data;
  };

  return useSWR(process.env.NEXT_PUBLIC_API_URL + '/team', fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  // return useQuery<IApiResponse<ITeamWithAdmin[]>['data']>({
  //   queryKey: [QUERY_KEYS.TEAMS],
  //   queryFn: async () => {
  //     const { data } = await fetchData('/api/team');

  //     return data;
  //   },
  //   staleTime: Infinity,
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: false,
  // });
};
