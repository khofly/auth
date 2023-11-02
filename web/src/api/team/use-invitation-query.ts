import { IApiResponse } from '@khofly/core';

import useFetch from '../use-fetch';
import { useGlobalStore } from '@store/global';
import useSWR from 'swr';
import useToast from '@hooks/use-toast';

export interface IInvitationWithTeam {
  id: string;
  user_id: string;
  team_id: string;
  team: {
    name: string;
    admin: {
      avatar_url: string;
      display_name: string;
    };
  };
}

export const useInvitationsSWR = () => {
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

    if (res?.error) toast.show({ title: 'Invitations error', message: res?.message, color: 'red' });

    return res?.data;
  };

  return useSWR(process.env.NEXT_PUBLIC_API_URL + '/team/invitations', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  // return useQuery<IApiResponse<IInvitationWithTeam[]>['data']>({
  //   queryKey: [QUERY_KEYS.INVITATIONS],
  //   queryFn: async () => {
  //     const { data } = await fetchData('/api/team/invitation');

  //     return data;
  //   },
  //   staleTime: Infinity,
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: false,
  // });
};
