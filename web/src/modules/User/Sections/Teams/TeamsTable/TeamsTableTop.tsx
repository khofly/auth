import { Button, Divider, Flex, Pagination, Text } from '@mantine/core';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import React, { Dispatch } from 'react';

import { ITeam, TIER_LIMITS } from '@khofly/core';
import { openModal } from '@mantine/modals';
import CreateTeamModal from '../modals/CreateTeamModal';
import Unavailable from '../states/Unavailable';
import { useGlobalStore, useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

interface Props {
  teams: ITeam[];
  total: number;
  page: number;
  setPage: Dispatch<number>;
  tierTeamAvailable: number;
}

const TeamsTableTop: React.FC<Props> = ({ teams, page, setPage, total, tierTeamAvailable }) => {
  const translate = useTranslations();
  const { tier } = useGlobalStore((state) => ({ tier: state.tier }));

  const canCreateTeam = teams?.length < TIER_LIMITS[tier].teamNoLimit;

  const openCreateModal = () => {
    return openModal({
      title: (
        <Text size="lg" fw={600}>
          {translate('pages.user.teams.teamsTable.modalCreateTitle')}
        </Text>
      ),
      centered: true,
      children: <CreateTeamModal />,
    });
  };

  return (
    <>
      <Flex p="xs" mt="xl" bg="dark.6" gap="md" align="center">
        {tier >= tierTeamAvailable ? (
          <>
            <Button
              variant="light"
              size="xs"
              // onClick={() => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] })}
              leftSection={<IconRefresh style={getIconStyle(16)} />}
              // loading={!!queryClient.isFetching({ queryKey: [QUERY_KEYS.TEAMS] })}
            >
              {translate('pages.user.teams.teamsTable.refreshBtn')}
            </Button>

            <Button
              size="xs"
              leftSection={<IconPlus style={getIconStyle(16)} />}
              onClick={openCreateModal}
              disabled={!canCreateTeam}
            >
              {translate('pages.user.teams.teamsTable.createNewBtn')}
            </Button>
          </>
        ) : (
          <Unavailable tier={tierTeamAvailable} />
        )}

        <div style={{ flex: 1 }}></div>

        {teams && total > 1 && <Pagination value={page} onChange={setPage} total={total} size="md" />}
      </Flex>

      <Divider />
    </>
  );
};

export default TeamsTableTop;
