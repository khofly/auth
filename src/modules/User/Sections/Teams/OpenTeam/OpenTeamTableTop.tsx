import { Button, Divider, Flex, Pagination, Text } from '@mantine/core';
import { IconArrowLeft, IconPlus, IconUser } from '@tabler/icons-react';
import React, { Dispatch } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useGlobalCtx from 'src/store/global/use-global-ctx';
import { QUERY_KEYS } from 'src/api/queryKeys';
import { IProfile } from '@fossly/core';
import { openModal } from '@mantine/modals';
import CreateTeamModal from '../modals/CreateTeamModal';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';
import { IMemberWithUser } from 'src/api/team/use-team-users-query';
import InviteUserModal from '../modals/InvileUserModal';

interface Props {
  members: IMemberWithUser[];
  openTeam: ITeamWithAdmin;
  setOpenTeam: Dispatch<ITeamWithAdmin>;
  total: number;
  page: number;
  setPage: Dispatch<number>;
}

const OpenTeamTableTop: React.FC<Props> = ({ members, openTeam, setOpenTeam, page, setPage, total }) => {
  const { translate, content, profile } = useGlobalCtx();

  const isAdmin = profile?.id === openTeam?.admin_id;

  const openInviteModal = () => {
    return openModal({
      title: (
        <Text size="lg" fw={600}>
          {translate(content.pages.user.teams.openTeamTable.modalInviteTitle)}
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
          leftIcon={<IconArrowLeft size={16} />}
        >
          {translate(content.pages.user.teams.openTeamTable.backBtn)}
        </Button>

        {isAdmin && (
          <Button size="xs" leftIcon={<IconUser size={16} />} onClick={openInviteModal}>
            {translate(content.pages.user.teams.openTeamTable.inviteBtn)}
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
