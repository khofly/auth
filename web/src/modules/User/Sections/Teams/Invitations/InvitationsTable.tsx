import { Center, Loader, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { useInvitationsSWR } from 'src/api/team/use-invitation-query';
import EmptyState from '../states/EmptyState';
import InviteRow from './InviteRow';

const InvitationsTable = () => {
  // Invitations data
  const { data: invitations, isLoading } = useInvitationsSWR();

  const rows = invitations && invitations?.map((inv, i) => <InviteRow key={i} {...inv} />);

  return (
    <ScrollArea style={{ overflow: 'unset' }} offsetScrollbars>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Invited by</Table.Th>
            <Table.Th>Team name</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {!isLoading && !invitations?.length && <EmptyState />}

      {isLoading && (
        <Center my="lg">
          <Loader size="lg" />
        </Center>
      )}
    </ScrollArea>
  );
};

export default InvitationsTable;
