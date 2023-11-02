import { Button, TextInput, useMantineTheme } from '@mantine/core';
import { matches, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useGlobalStore, useTranslations } from '@store/global';
import { IconBrandGithub, IconBrandGitlab } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import { useCommonProfileSWR, UpdateAvatarDTO } from 'src/api/profile/use-profile-mutation';

const AvatarModal = () => {
  const translate = useTranslations();
  const { session, profile } = useGlobalStore((state) => ({
    session: state.session,
    profile: state.profile,
  }));

  const theme = useMantineTheme();

  const providerAvatar = session.user?.user_metadata?.avatar_url || '';

  const provider = session.user.app_metadata.provider;
  const providerIcon = {
    github: <IconBrandGithub style={getIconStyle(20)} />,
    gitlab: <IconBrandGitlab style={getIconStyle(20)} color={theme.colors.orange[6]} />,
  };

  const profileSwr = useCommonProfileSWR<UpdateAvatarDTO>(
    process.env.NEXT_PUBLIC_API_URL + '/profile/avatar',
    'POST'
  );

  const form = useForm({
    initialValues: {
      avatar_url: profile.avatar_url,
    },

    validate: {
      avatar_url: matches(
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        translate('pages.user.details.invalidUrl')
      ),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await profileSwr.trigger({ avatar_url: values.avatar_url });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate('pages.user.details.modalAvatarInputNewLabel')}
        placeholder={translate('pages.user.details.modalAvatarInputNewPlaceholder')}
        mt="sm"
        {...form.getInputProps('avatar_url')}
      />

      {['github', 'gitlab'].includes(provider) && (
        <TextInput
          label={translate('pages.user.details.modalAvatarInputOldLabel')}
          description={translate('pages.user.details.modalAvatarInputOldDescription')}
          placeholder=""
          mt="lg"
          value={providerAvatar}
          onChange={() => {}}
          leftSection={providerIcon[provider] || null}
        />
      )}

      <Button fullWidth mt="xl" type="submit" loading={profileSwr.isMutating}>
        {translate('pages.user.details.modalAvatarBtn')}
      </Button>
    </form>
  );
};

export default AvatarModal;
