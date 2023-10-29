import { Center, Collapse, Loader, ScrollArea, Table } from '@mantine/core';
import React, { Dispatch, useEffect, useState } from 'react';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';
import EmptyState from '../states/EmptyState';
import MemberRow from './MemberRow';
import OpenTeamTableTop from './OpenTeamTableTop';
import { useTeamUsersQuery } from 'src/api/team/use-team-users-query';
import { useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS } from 'src/api/queryKeys';

interface Props {
  openTeam: ITeamWithAdmin;
  setOpenTeam: Dispatch<ITeamWithAdmin>;
}

const OpenTeamTable: React.FC<Props> = ({ openTeam, setOpenTeam }) => {
  // Fetch members
  const { data: members, isFetching, refetch } = useTeamUsersQuery(openTeam?.id);

  // Pagination
  const [page, setPage] = useState<number>(1);

  const perPage = 10;
  const total = Math.ceil(members?.length / perPage);

  const rows = members && members.map((m, i) => <MemberRow key={i} adminId={openTeam?.admin_id} {...m} />);

  useEffect(() => {
    if (openTeam) refetch();
  }, [openTeam]);

  return (
    <Collapse in={!!openTeam}>
      <ScrollArea sx={{ overflow: 'unset' }} offsetScrollbars>
        <OpenTeamTableTop
          members={members}
          openTeam={openTeam}
          setOpenTeam={setOpenTeam}
          total={total}
          page={page}
          setPage={setPage}
        />
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{!isFetching && rows}</tbody>
        </Table>

        {!isFetching && !members?.length && <EmptyState />}

        {isFetching && (
          <Center my="lg">
            <Loader size="lg" />
          </Center>
        )}
      </ScrollArea>
    </Collapse>
  );
};

export default OpenTeamTable;
