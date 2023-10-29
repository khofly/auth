import useToast from '@hooks/use-toast';
import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useUser } from '@supabase/auth-helpers-react';
import { IconIdBadge2 } from '@tabler/icons-react';
import { MUTATION_KEYS } from 'src/api/queryKeys';
import { InviteTeamDTO, useCommonTeamMutation } from 'src/api/team/use-team-mutation';
import useGlobalCtx from 'src/store/global/use-global-ctx';

interface Props {
  id: string; // team_id
}

const InviteUserModal: React.FC<Props> = ({ id }) => {
  const { translate, content } = useGlobalCtx();
  const teamMutation = useCommonTeamMutation<InviteTeamDTO>(
    '/api/team/invitation',
    'POST',
    MUTATION_KEYS.TEAM_INVITE
  );

  const { toast } = useToast();
  const user = useUser();

  const form = useForm({
    initialValues: {
      user_id: '',
    },

    validate: {
      user_id: matches(
        /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/,
        translate(content.pages.user.teams.openTeamTable.invalidId)
      ),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (values.user_id === user.id) return toast.show({ message: 'Nice try', color: 'yellow' });

    await teamMutation.mutateAsync({ team_id: id, user_id: values.user_id });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate(content.pages.user.teams.openTeamTable.modalInviteInputLabel)}
        placeholder={translate(content.pages.user.teams.openTeamTable.modalInviteInputPlaceholder)}
        mt="sm"
        icon={<IconIdBadge2 size={22} stroke={1.5} />}
        {...form.getInputProps('user_id')}
      />

      <Button fullWidth mt="lg" type="submit" loading={teamMutation.isLoading}>
        {translate(content.pages.user.teams.openTeamTable.modalInviteBtn)}
      </Button>
    </form>
  );
};

export default InviteUserModal;
