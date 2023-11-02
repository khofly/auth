import { Center, Collapse, Loader, ScrollArea, Table } from '@mantine/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';
import EmptyState from '../states/EmptyState';
import MemberRow from './MemberRow';
import OpenTeamTableTop from './OpenTeamTableTop';
import { useTeamUsersSWR } from 'src/api/team/use-team-users-query';

interface Props {
  openTeam: ITeamWithAdmin;
  setOpenTeam: Dispatch<ITeamWithAdmin>;
}

const OpenTeamTable: React.FC<Props> = ({ openTeam, setOpenTeam }) => {
  // Fetch members
  const { data: members, isLoading, mutate } = useTeamUsersSWR(openTeam?.id);

  // Pagination
  const [page, setPage] = useState<number>(1);

  const perPage = 10;
  const total = Math.ceil(members?.length / perPage);

  const rows = members && members.map((m, i) => <MemberRow key={i} adminId={openTeam?.admin_id} {...m} />);

  useEffect(() => {
    if (openTeam) mutate();
  }, [openTeam]);

  return (
    <Collapse in={!!openTeam}>
      <ScrollArea style={{ overflow: 'unset' }} offsetScrollbars>
        <OpenTeamTableTop
          members={members}
          openTeam={openTeam}
          setOpenTeam={setOpenTeam}
          total={total}
          page={page}
          setPage={setPage}
        />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{!isLoading && rows}</Table.Tbody>
        </Table>

        {!isLoading && !members?.length && <EmptyState />}

        {isLoading && (
          <Center my="lg">
            <Loader size="lg" />
          </Center>
        )}
      </ScrollArea>
    </Collapse>
  );
};

export default OpenTeamTable;
