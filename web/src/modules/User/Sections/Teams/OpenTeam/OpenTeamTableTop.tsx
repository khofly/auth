import { Button, Divider, Flex, Pagination, Text } from '@mantine/core';
import { IconArrowLeft, IconUser } from '@tabler/icons-react';
import React, { Dispatch } from 'react';
import { openModal } from '@mantine/modals';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';
import { IMemberWithUser } from 'src/api/team/use-team-users-query';
import InviteUserModal from '../modals/InvileUserModal';
import { useGlobalStore, useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

interface Props {
  members: IMemberWithUser[];
  openTeam: ITeamWithAdmin;
  setOpenTeam: Dispatch<ITeamWithAdmin>;
  total: number;
  page: number;
  setPage: Dispatch<number>;
}

const OpenTeamTableTop: React.FC<Props> = ({ members, openTeam, setOpenTeam, page, setPage, total }) => {
  const translate = useTranslations();
  const { profile } = useGlobalStore((state) => ({ profile: state.profile }));

  const isAdmin = profile?.id === openTeam?.admin_id;

  const openInviteModal = () => {
    return openModal({
      title: (
        <Text size="lg" fw={600}>
          {translate('pages.user.teams.openTeamTable.modalInviteTitle')}
        </Text>
      ),
      centered: true,
      children: <InviteUserModal id={openTeam.id} />,
    });
  };

  return (
    <>
      <Flex p="xs" mt="xl" bg="dark.6" gap="md" align="center">
        <Button
          variant="light"
          size="xs"
          onClick={() => setOpenTeam(null)}
          leftSection={<IconArrowLeft style={getIconStyle(16)} />}
        >
          {translate('pages.user.teams.openTeamTable.backBtn')}
        </Button>

        {isAdmin && (
          <Button size="xs" leftSection={<IconUser style={getIconStyle(16)} />} onClick={openInviteModal}>
            {translate('pages.user.teams.openTeamTable.inviteBtn')}
          </Button>
        )}

        <div style={{ flex: 1 }}></div>

        {members && total > 1 && <Pagination value={page} onChange={setPage} total={total} size="md" />}
      </Flex>

      <Divider />
    </>
  );
};

export default OpenTeamTableTop;
