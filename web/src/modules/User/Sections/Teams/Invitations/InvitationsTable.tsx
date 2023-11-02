import { Center, Loader, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { useInvitationsSWR } from 'src/api/team/use-invitation-query';
import EmptyState from '../states/EmptyState';
import InviteRow from './InviteRow';

const InvitationsTable = () => {
  // Invitations data
  const { data: invitations, isLoading } = useInvitationsSWR();

  const rows = invitations && invitations.map((inv, i) => <InviteRow key={i} {...inv} />);

  return (
    <ScrollArea style={{ overflow: 'unset' }} offsetScrollbars>
      <Table>
        <thead>
          <tr>
            <th>Invited by</th>
            <th>Team name</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
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
