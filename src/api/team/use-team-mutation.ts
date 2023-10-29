import useToast from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import useFetch from '../use-fetch';

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

export const useCommonTeamMutation = <DTO>(
  url: string,
  method: 'POST' | 'DELETE' | 'PATCH',
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
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] });
      }

      if (res.error) {
        toast.show({ title: 'Team error', message: res.message, color: 'yellow' });
      } else {
        toast.show({ title: 'Success', message: res.message, color: 'green' });
      }
    },
  });
};
