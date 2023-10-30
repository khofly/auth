import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { MUTATION_KEYS } from 'src/api/queryKeys';
import { RenameTeamDTO, useCommonTeamMutation } from 'src/api/team/use-team-mutation';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';

const CreateTeamModal = () => {
  const { translate, content } = useGlobalCtx();
  const teamMutation = useCommonTeamMutation<RenameTeamDTO>('/api/team', 'POST', MUTATION_KEYS.TEAM_RENAME);

  const form = useForm({
    initialValues: {
      name: '',
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
        label={translate(content.pages.user.teams.teamsTable.modalCreateInput)}
        placeholder={translate(content.pages.user.teams.teamsTable.modalCreateInput)}
        mt="sm"
        data-autofocus
        {...form.getInputProps('name')}
      />

      <Button fullWidth mt="lg" type="submit" loading={teamMutation.isLoading}>
        {translate(content.pages.user.teams.teamsTable.modalCreateBtn)}
      </Button>
    </form>
  );
};

export default CreateTeamModal;
