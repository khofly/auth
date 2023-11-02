import useToast from '@hooks/use-toast';
import useFetch from '../use-fetch';
import { useGlobalStore } from '@store/global';
import useSWRMutation from 'swr/mutation';

export interface CreateTeamDTO {
  name: string;
}

export interface RenameTeamDTO {
  name: string;
}

export interface DeleteTeamDTO {
  id: string;
}

export interface InviteTeamDTO {
  user_id: string;
  team_id: string;
}

export interface AcceptInviteTeamDTO {
  invitation_id: string;
}

export interface RejectInviteTeamDTO {
  invitation_id: string;
}

// ---------------------------------------------------------------
// Universal hook, used for any action on team API
// ---------------------------------------------------------------

export const useCommonTeamSWR = <DTO>(
  url: string,
  method: 'POST' | 'DELETE' | 'PATCH'
  // shouldInvalidate: boolean = true
) => {
  const { session } = useGlobalStore((state) => ({
    session: state.session,
  }));

  const { fetchData } = useFetch();
  const { toast } = useToast();

  const fetcher = (key, { arg }: { arg: DTO }) =>
    fetchData(key, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
        'SB-Refresh-Token': session?.refresh_token || '',
      },
      body: JSON.stringify(arg),
    });

  return useSWRMutation(url, fetcher, {
    onSuccess(data, key, config) {
      if (data?.error) {
        toast.show({ title: 'Document error', message: data?.message, color: 'yellow' });
      } else {
        toast.show({ title: 'Success', message: data?.message, color: 'green' });
      }
    },
  });

  // return useMutation({
  //   mutationKey: [mutationKey],
  //   mutationFn: (data: DTO) => {
  //     return fetchData(url, {
  //       method,
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   },

  //   onSettled: (res) => {
  //     if (shouldInvalidate) {
  //       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] });
  //     }

  //     if (res.error) {
  //       toast.show({ title: 'Team error', message: res.message, color: 'yellow' });
  //     } else {
  //       toast.show({ title: 'Success', message: res.message, color: 'green' });
  //     }
  //   },
  // });
};
