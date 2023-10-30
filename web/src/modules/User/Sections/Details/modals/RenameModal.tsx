import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useCommonProfileMutation, UpdateNameDTO } from 'src/api/profile/use-profile-mutation';
import { MUTATION_KEYS } from 'src/api/queryKeys';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';

const RenameModal = () => {
  const { translate, content, profile } = useGlobalCtx();

  const profileMutation = useCommonProfileMutation<UpdateNameDTO>(
    '/api/profile/name',
    'POST',
    MUTATION_KEYS.PROFILE_NAME
  );

  const form = useForm({
    initialValues: {
      display_name: profile.display_name,
    },

    validate: {
      display_name: isNotEmpty(translate(content.common.fieldRequired)),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await profileMutation.mutateAsync({ display_name: values.display_name });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate(content.pages.user.details.modalNameInputLabel)}
        placeholder={translate(content.pages.user.details.modalNameInputPlaceholder)}
        mt="sm"
        {...form.getInputProps('display_name')}
      />

      <Button fullWidth mt="xl" type="submit" loading={profileMutation.isLoading}>
        {translate(content.pages.user.details.modalNameBtn)}
      </Button>
    </form>
  );
};

export default RenameModal;
