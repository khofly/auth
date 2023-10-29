import { Center, Loader, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { useInvitationsQuery } from 'src/api/team/use-invitation-query';
import EmptyState from '../states/EmptyState';
import InviteRow from './InviteRow';

const InvitationsTable = () => {
  // Invitations data
  const { data: invitations, isLoading } = useInvitationsQuery();

  const rows = invitations && invitations.map((inv, i) => <InviteRow key={i} {...inv} />);

  return (
    <ScrollArea sx={{ overflow: 'unset' }} offsetScrollbars>
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
