import { IApiResponse, ITeam } from '@fossly/core';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import useFetch from '../use-fetch';

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

const useInvitationsQuery = () => {
  const { fetchData } = useFetch();

  return useQuery<IApiResponse<IInvitationWithTeam[]>['data']>({
    queryKey: [QUERY_KEYS.INVITATIONS],
    queryFn: async () => {
      const { data } = await fetchData('/api/team/invitation');

      return data;
    },
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export { useInvitationsQuery };
