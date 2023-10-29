import { Center, Collapse, Loader, ScrollArea, Table } from '@mantine/core';
import React, { Dispatch, useState } from 'react';
import TeamsTableTop from './TeamsTableTop';
import { ITeamWithAdmin, useTeamsQuery } from 'src/api/team/use-team-query';
import TeamRow from './TeamRow';
import EmptyState from '../states/EmptyState';
import useGlobalCtx from 'src/store/global/use-global-ctx';

interface Props {
  setOpenTeam: Dispatch<ITeamWithAdmin>;
  openTeam: ITeamWithAdmin;
  tierTeamAvailable: number;
}

const TeamsTable: React.FC<Props> = ({ openTeam, setOpenTeam, tierTeamAvailable }) => {
  const { translate, content, tier } = useGlobalCtx();

  // Teams data
  const { data: teams, isLoading } = useTeamsQuery();

  // Pagination
  const [page, setPage] = useState<number>(1);

  const perPage = 5;
  const total = Math.ceil(teams?.length / perPage);

  const rows =
    teams && teams.map((t, i) => <TeamRow key={i} setOpenTeam={setOpenTeam} setPage={setPage} {...t} />);

  return (
    <Collapse in={!openTeam}>
      <ScrollArea sx={{ overflow: 'unset' }} offsetScrollbars>
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
          <thead>
            <tr>
              <th>Team</th>
              <th>Admin</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
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
