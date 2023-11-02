import { Button, Text } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useTranslations } from '@store/global';
import React, { Dispatch } from 'react';
import { DeleteTeamDTO, useCommonTeamSWR } from 'src/api/team/use-team-mutation';

interface Props {
  id: string;
  setPage: Dispatch<number>;
}

const DeleteModal: React.FC<Props> = ({ id, setPage }) => {
  const translate = useTranslations();
  const teamSwr = useCommonTeamSWR<DeleteTeamDTO>(process.env.NEXT_PUBLIC_API_URL + '/team/delete', 'POST');

  const handleSubmit = async () => {
    await teamSwr.trigger({ id });

    setPage(1);
    closeAllModals();
  };

  return (
    <>
      <Text size="sm">{translate('pages.user.teams.teamsTable.modalDeleteDescription')}</Text>

      <Button fullWidth mt="lg" onClick={handleSubmit} loading={teamSwr.isMutating} color="red">
        {translate('pages.user.teams.teamsTable.modalDeleteBtn')}
      </Button>
    </>
  );
};

export default DeleteModal;
