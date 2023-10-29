import { Avatar, Button, Flex, Text, rem } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { MUTATION_KEYS, QUERY_KEYS } from 'src/api/queryKeys';
import { IInvitationWithTeam } from 'src/api/team/use-invitation-query';
import {
  AcceptInviteTeamDTO,
  RejectInviteTeamDTO,
  useCommonTeamMutation,
} from 'src/api/team/use-team-mutation';

interface Props extends IInvitationWithTeam {}

const InviteRow: React.FC<Props> = ({ team, id }) => {
  const queryClient = useQueryClient();

  const rejectMutation = useCommonTeamMutation<RejectInviteTeamDTO>(
    '/api/team/invitation/reject',
    'POST',
    MUTATION_KEYS.INVITATION_REJECT
  );
  const acceptMutation = useCommonTeamMutation<AcceptInviteTeamDTO>(
    '/api/team/invitation/accept',
    'POST',
    MUTATION_KEYS.INVITATION_ACCEPT
  );

  const handleAccept = async () => {
    await acceptMutation.mutateAsync({ invitation_id: id });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVITATIONS] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TEAMS] });
  };

  const handleReject = async () => {
    await rejectMutation.mutateAsync({ invitation_id: id });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVITATIONS] });
  };

  return (
    <tr>
      <td>
        <Flex align="center">
          <Avatar src={team.admin.avatar_url} alt={`${team.admin.display_name}'s avatar`} radius="xl" />

          <Text ml="xs" size={rem(16)} weight={600}>
            {team.admin.display_name}
          </Text>
        </Flex>
      </td>

      <td>{team.name}</td>

      <td align="right">
        <Button
          size="xs"
          mr="md"
          leftIcon={<IconCheck size={18} />}
          onClick={handleAccept}
          loading={acceptMutation.isLoading}
        >
          Accept
        </Button>

        <Button
          size="xs"
          color="red"
          leftIcon={<IconX size={18} />}
          onClick={handleReject}
          loading={rejectMutation.isLoading}
        >
          Reject
        </Button>
      </td>
    </tr>
  );
};

export default InviteRow;
