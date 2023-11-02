import useFetch from '../use-fetch';
import { useGlobalStore } from '@store/global';
import useToast from '@hooks/use-toast';
import useSWR from 'swr';

export interface IMemberWithUser {
  user_id: string;
  team_id: string;
  user: {
    avatar_url: string;
    display_name: string;
    email: string;
  };
}

export const useTeamUsersSWR = (id: string) => {
  const { session } = useGlobalStore((state) => ({
    session: state.session,
  }));

  const { fetchData } = useFetch();

  const fetcher = async (key) =>
    fetchData(key, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
        'SB-Refresh-Token': session?.refresh_token || '',
      },
    });

  return useSWR(process.env.NEXT_PUBLIC_API_URL + `/team/user?team_id=` + id, fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });
};
