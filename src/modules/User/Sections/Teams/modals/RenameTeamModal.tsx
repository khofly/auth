import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { MUTATION_KEYS } from 'src/api/queryKeys';
import { RenameTeamDTO, useCommonTeamMutation } from 'src/api/team/use-team-mutation';
import useGlobalCtx from 'src/store/global/use-global-ctx';

interface Props {
  id: string;
  name: string;
}

const RenameTeamModal: React.FC<Props> = ({ id, name }) => {
  const { translate, content } = useGlobalCtx();
  const teamMutation = useCommonTeamMutation<RenameTeamDTO>(
    '/api/team/name',
    'POST',
    MUTATION_KEYS.TEAM_RENAME
  );

  const form = useForm({
    initialValues: {
      name,
    },

    validate: {
      name: isNotEmpty(translate(content.common.fieldRequired)),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await teamMutation.mutateAsync({ name: values.name });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate(content.pages.user.teams.teamsTable.modalNameInput)}
        placeholder={translate(content.pages.user.teams.teamsTable.modalNameInput)}
        mt="sm"
        {...form.getInputProps('name')}
      />

      <Button fullWidth mt="lg" type="submit" loading={teamMutation.isLoading}>
        {translate(content.pages.user.teams.teamsTable.modalNameBtn)}
      </Button>
    </form>
  );
};

export default RenameTeamModal;
