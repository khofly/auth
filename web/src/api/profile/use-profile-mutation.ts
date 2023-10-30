import useToast from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import useFetch from '../use-fetch';

export interface UpdateAvatarDTO {
  avatar_url: string;
}

export interface UpdateNameDTO {
  display_name: string;
}

// ---------------------------------------------------------------
// Universal hook, used for any action on profile API
// ---------------------------------------------------------------

export const useCommonProfileMutation = <DTO>(
  url: string,
  method: 'POST',
  mutationKey: string,
  shouldInvalidate: boolean = true
) => {
  const queryClient = useQueryClient();
  const { fetchData } = useFetch();
  const { toast } = useToast();

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: DTO) => {
      return fetchData(url, {
        method,
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
    },

    onSettled: (res) => {
      if (shouldInvalidate) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEMBERS] });
      }

      if (res.error) {
        toast.show({ title: 'Team error', message: res.message, color: 'yellow' });
      } else {
        toast.show({ title: 'Success', message: res.message, color: 'green' });
      }
    },
  });
};
