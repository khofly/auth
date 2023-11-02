import useToast from '@hooks/use-toast';
import useFetch from '../use-fetch';
import { useGlobalStore } from '@store/global';
import useSWRMutation from 'swr/mutation';

export interface UpdateAvatarDTO {
  avatar_url: string;
}

export interface UpdateNameDTO {
  display_name: string;
}

// ---------------------------------------------------------------
// Universal hook, used for any action on profile API
// ---------------------------------------------------------------

export const useCommonProfileSWR = <DTO>(
  url: string,
  method: 'POST'
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
  //       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
  //       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] });
  //       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEMBERS] });
  //     }

  //     if (res.error) {
  //       toast.show({ title: 'Team error', message: res.message, color: 'yellow' });
  //     } else {
  //       toast.show({ title: 'Success', message: res.message, color: 'green' });
  //     }
  //   },
  // });
};
