import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useGlobalStore, useTranslations } from '@store/global';
import { useCommonProfileSWR, UpdateNameDTO } from 'src/api/profile/use-profile-mutation';

const RenameModal = () => {
  const translate = useTranslations();

  const { profile } = useGlobalStore((state) => ({ profile: state.profile }));

  const profileSwr = useCommonProfileSWR<UpdateNameDTO>(
    process.env.NEXT_PUBLIC_API_URL + '/profile/name',
    'POST'
  );

  const form = useForm({
    initialValues: {
      display_name: profile.display_name,
    },

    validate: {
      display_name: isNotEmpty(translate('common.fieldRequired')),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await profileSwr.trigger({ display_name: values.display_name });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate('pages.user.details.modalNameInputLabel')}
        placeholder={translate('pages.user.details.modalNameInputPlaceholder')}
        mt="sm"
        {...form.getInputProps('display_name')}
      />

      <Button fullWidth mt="xl" type="submit" loading={profileSwr.isMutating}>
        {translate('pages.user.details.modalNameBtn')}
      </Button>
    </form>
  );
};

export default RenameModal;
