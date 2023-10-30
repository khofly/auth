import { IApiResponse, ITeam } from '@khofly/core';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import useFetch from '../use-fetch';

export interface ITeamWithAdmin extends ITeam {
  admin: {
    avatar_url: string;
    display_name: string;
  };
}

const useTeamsQuery = () => {
  const { fetchData } = useFetch();

  return useQuery<IApiResponse<ITeamWithAdmin[]>['data']>({
    queryKey: [QUERY_KEYS.TEAMS],
    queryFn: async () => {
      const { data } = await fetchData('/api/team');

      return data;
    },
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export { useTeamsQuery };
