import { TIER_LIMITS } from '@khofly/core';
import { Divider, Flex, Paper, Space, Text } from '@mantine/core';
import { IconMailbox, IconUsers } from '@tabler/icons-react';
import React, { useState } from 'react';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';
import InvitationsTable from './Invitations/InvitationsTable';
import TeamsTable from './TeamsTable/TeamsTable';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';

import OpenTeamTable from './OpenTeam/OpenTeamTable';

const Teams = () => {
  const { translate, content } = useGlobalCtx();

  const [openTeam, setOpenTeam] = useState<ITeamWithAdmin>(null); // team

  const tierTeamAvailable = parseInt(Object.keys(TIER_LIMITS).find((t) => TIER_LIMITS[t].canCreateTeam));

  return (
    <Paper radius="md" p="xl" mb={60} withBorder>
      <Flex align="center" mb="xl">
        <IconUsers size={32} />

        <Text size={28} weight={600} ml="sm">
          {openTeam ? openTeam?.name : translate(content.pages.user.teams.title1)}
        </Text>
      </Flex>

      <Divider my="md" />

      <TeamsTable openTeam={openTeam} setOpenTeam={setOpenTeam} tierTeamAvailable={tierTeamAvailable} />
      <OpenTeamTable openTeam={openTeam} setOpenTeam={setOpenTeam} />

      <Space h={60} />

      <Flex align="center" mb="xl">
        <IconMailbox size={32} />

        <Text size={28} weight={600} ml="sm">
          {translate(content.pages.user.teams.title2)}
        </Text>
      </Flex>

      <Divider my="md" />

      <InvitationsTable />
    </Paper>
  );
};

export default Teams;
