import { Avatar, Badge, Flex, Text, rem } from '@mantine/core';
import React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { IMemberWithUser } from 'src/api/team/use-team-users-query';

dayjs.extend(relativeTime);

interface Props extends IMemberWithUser {
  adminId: string;
}

const MemberRow: React.FC<Props> = ({ adminId, user_id, user }) => {
  const isAdmin = user_id === adminId;

  if (!user) return;

  return (
    <tr>
      <td>
        <Flex align="center">
          <Avatar src={user.avatar_url} alt={`${user.display_name}'s avatar`} radius="xl" />

          <Text ml="xs" fz={rem(14)} fw={600}>
            {user.display_name}
          </Text>
        </Flex>
      </td>

      <td>
        <Text fz={rem(14)} fw={600}>
          {user.email}
        </Text>
      </td>

      <td>
        <Badge variant="dot" size="md" color={isAdmin ? 'teal' : 'cyan'} radius="xl">
          {isAdmin ? 'Admin' : 'User'}
        </Badge>
      </td>

      <td>actions</td>
    </tr>
  );
};

export default MemberRow;
