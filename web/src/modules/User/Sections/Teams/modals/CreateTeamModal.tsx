import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useTranslations } from '@store/global';
import { CreateTeamDTO, useCommonTeamSWR } from 'src/api/team/use-team-mutation';

const CreateTeamModal = () => {
  const translate = useTranslations();
  const teamSwr = useCommonTeamSWR<CreateTeamDTO>(process.env.NEXT_PUBLIC_API_URL + '/team', 'POST');

  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: isNotEmpty(translate('common.fieldRequired')),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await teamSwr.trigger({ name: values.name });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate('pages.user.teams.teamsTable.modalCreateInput')}
        placeholder={translate('pages.user.teams.teamsTable.modalCreateInput')}
        mt="sm"
        data-autofocus
        {...form.getInputProps('name')}
      />

      <Button fullWidth mt="lg" type="submit" loading={teamSwr.isMutating}>
        {translate('pages.user.teams.teamsTable.modalCreateBtn')}
      </Button>
    </form>
  );
};

export default CreateTeamModal;
