import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useTranslations } from '@store/global';
import { RenameTeamDTO, useCommonTeamSWR } from 'src/api/team/use-team-mutation';

interface Props {
  id: string;
  name: string;
}

const RenameTeamModal: React.FC<Props> = ({ id, name }) => {
  const translate = useTranslations();

  const teamSwr = useCommonTeamSWR<RenameTeamDTO>(process.env.NEXT_PUBLIC_API_URL + '/team/name', 'POST');

  const form = useForm({
    initialValues: {
      name,
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
        label={translate('pages.user.teams.teamsTable.modalNameInput')}
        placeholder={translate('pages.user.teams.teamsTable.modalNameInput')}
        mt="sm"
        {...form.getInputProps('name')}
      />

      <Button fullWidth mt="lg" type="submit" loading={teamSwr.isMutating}>
        {translate('pages.user.teams.teamsTable.modalNameBtn')}
      </Button>
    </form>
  );
};

export default RenameTeamModal;
