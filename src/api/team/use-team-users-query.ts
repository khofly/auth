import { IApiResponse, ITeam } from '@fossly/core';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import useFetch from '../use-fetch';

export interface IMemberWithUser {
  user_id: string;
  team_id: string;
  user: {
    avatar_url: string;
    display_name: string;
    email: string;
  };
}

const useTeamUsersQuery = (id: string) => {
  const { fetchData } = useFetch();

  return useQuery<IApiResponse<IMemberWithUser[]>['data']>({
    queryKey: [QUERY_KEYS.MEMBERS],
    queryFn: async () => {
      if (!id) return [];

      const { data } = await fetchData(`/api/team/user?team_id=` + id);

      return data;
    },
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export { useTeamUsersQuery };
