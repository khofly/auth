import { Center, Collapse, Loader, ScrollArea, Table } from '@mantine/core';
import React, { Dispatch, useState } from 'react';
import TeamsTableTop from './TeamsTableTop';
import { ITeamWithAdmin, useTeamsSWR } from 'src/api/team/use-team-query';
import TeamRow from './TeamRow';
import EmptyState from '../states/EmptyState';

interface Props {
  setOpenTeam: Dispatch<ITeamWithAdmin>;
  openTeam: ITeamWithAdmin;
  tierTeamAvailable: number;
}

const TeamsTable: React.FC<Props> = ({ openTeam, setOpenTeam, tierTeamAvailable }) => {
  // Teams data
  const { data: teams, isLoading } = useTeamsSWR();

  // Pagination
  const [page, setPage] = useState<number>(1);

  const perPage = 5;
  const total = Math.ceil(teams?.length / perPage);

  const rows =
    teams && teams?.map((t, i) => <TeamRow key={i} setOpenTeam={setOpenTeam} setPage={setPage} {...t} />);

  return (
    <Collapse in={!openTeam}>
      <ScrollArea style={{ overflow: 'unset' }} offsetScrollbars>
        {teams && (
          <TeamsTableTop
            teams={teams}
            total={total}
            page={page}
            setPage={setPage}
            tierTeamAvailable={tierTeamAvailable}
          />
        )}
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Team</Table.Th>
              <Table.Th>Admin</Table.Th>
              <Table.Th>Created at</Table.Th>
              <Table.Th>Updated at</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        {!isLoading && !teams?.length && <EmptyState />}

        {isLoading && (
          <Center my="lg">
            <Loader size="lg" />
          </Center>
        )}
      </ScrollArea>
    </Collapse>
  );
};

export default TeamsTable;
