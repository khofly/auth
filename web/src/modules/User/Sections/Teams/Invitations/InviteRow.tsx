import React from 'react';
import { Avatar, Button, Flex, Text, rem } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import { IInvitationWithTeam } from 'src/api/team/use-invitation-query';
import { AcceptInviteTeamDTO, RejectInviteTeamDTO, useCommonTeamSWR } from 'src/api/team/use-team-mutation';

interface Props extends IInvitationWithTeam {}

const InviteRow: React.FC<Props> = ({ team, id }) => {
  const rejectSwr = useCommonTeamSWR<RejectInviteTeamDTO>(
    process.env.NEXT_PUBLIC_API_URL + '/team/invitation/reject',
    'POST'
  );
  const acceptSwr = useCommonTeamSWR<AcceptInviteTeamDTO>(
    process.env.NEXT_PUBLIC_API_URL + '/team/invitation/accept',
    'POST'
  );

  const handleAccept = async () => {
    await acceptSwr.trigger({ invitation_id: id });
    // TODO: add refetch
    // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVITATIONS] });
    // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] });
  };

  const handleReject = async () => {
    await rejectSwr.trigger({ invitation_id: id });
    // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVITATIONS] });
  };

  return (
    <tr>
      <td>
        <Flex align="center">
          <Avatar src={team.admin.avatar_url} alt={`${team.admin.display_name}'s avatar`} radius="xl" />

          <Text ml="xs" fz={rem(16)} fw={600}>
            {team.admin.display_name}
          </Text>
        </Flex>
      </td>

      <td>{team.name}</td>

      <td align="right">
        <Button
          size="xs"
          mr="md"
          leftSection={<IconCheck style={getIconStyle(18)} />}
          onClick={handleAccept}
          loading={acceptSwr.isMutating}
        >
          Accept
        </Button>

        <Button
          size="xs"
          color="red"
          leftSection={<IconX style={getIconStyle(18)} />}
          onClick={handleReject}
          loading={rejectSwr.isMutating}
        >
          Reject
        </Button>
      </td>
    </tr>
  );
};

export default InviteRow;
