import { Button, Text } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import React, { Dispatch } from 'react';
import { MUTATION_KEYS } from 'src/api/queryKeys';
import { DeleteTeamDTO, useCommonTeamMutation } from 'src/api/team/use-team-mutation';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';

interface Props {
  id: string;
  setPage: Dispatch<number>;
}

const DeleteModal: React.FC<Props> = ({ id, setPage }) => {
  const { translate, content } = useGlobalCtx();
  const teamMutation = useCommonTeamMutation<DeleteTeamDTO>(
    '/api/team/delete',
    'POST',
    MUTATION_KEYS.TEAM_DELETE
  );

  const handleSubmit = async () => {
    await teamMutation.mutateAsync({ id });

    setPage(1);
    closeAllModals();
  };

  return (
    <>
      <Text size="sm">{translate(content.pages.user.teams.teamsTable.modalDeleteDescription)}</Text>

      <Button fullWidth mt="lg" onClick={handleSubmit} loading={teamMutation.isLoading} color="red">
        {translate(content.pages.user.teams.teamsTable.modalDeleteBtn)}
      </Button>
    </>
  );
};

export default DeleteModal;
