import useToast from '@hooks/use-toast';
import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useGlobalStore, useTranslations } from '@store/global';
import { IconIdBadge2 } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';

import { InviteTeamDTO, useCommonTeamSWR } from 'src/api/team/use-team-mutation';

interface Props {
  id: string; // team_id
}

const InviteUserModal: React.FC<Props> = ({ id }) => {
  const translate = useTranslations();

  const { profile } = useGlobalStore((state) => ({ profile: state.profile }));

  const teamSwr = useCommonTeamSWR<InviteTeamDTO>(
    process.env.NEXT_PUBLIC_API_URL + '/team/invitation',
    'POST'
  );

  const { toast } = useToast();

  const form = useForm({
    initialValues: {
      user_id: '',
    },

    validate: {
      user_id: matches(
        /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/,
        translate('pages.user.teams.openTeamTable.invalidId')
      ),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (values.user_id === profile.id) return toast.show({ message: 'Nice try', color: 'yellow' });

    await teamSwr.trigger({ team_id: id, user_id: values.user_id });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate('pages.user.teams.openTeamTable.modalInviteInputLabel')}
        placeholder={translate('pages.user.teams.openTeamTable.modalInviteInputPlaceholder')}
        mt="sm"
        leftSection={<IconIdBadge2 style={getIconStyle(22)} stroke={1.5} />}
        {...form.getInputProps('user_id')}
      />

      <Button fullWidth mt="lg" type="submit" loading={teamSwr.isMutating}>
        {translate('pages.user.teams.openTeamTable.modalInviteBtn')}
      </Button>
    </form>
  );
};

export default InviteUserModal;
