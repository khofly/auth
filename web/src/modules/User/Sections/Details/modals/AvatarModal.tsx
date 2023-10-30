import { Button, TextInput, useMantineTheme } from '@mantine/core';
import { matches, useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useSession } from '@supabase/auth-helpers-react';
import { IconBrandGithub, IconBrandGitlab } from '@tabler/icons-react';
import { useCommonProfileMutation, UpdateAvatarDTO } from 'src/api/profile/use-profile-mutation';
import { MUTATION_KEYS } from 'src/api/queryKeys';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';

const AvatarModal = () => {
  const { translate, content, profile } = useGlobalCtx();
  const session = useSession();
  const theme = useMantineTheme();

  const providerAvatar = session.user?.user_metadata?.avatar_url || '';

  const provider = session.user.app_metadata.provider;
  const providerIcon = {
    github: <IconBrandGithub size={20} />,
    gitlab: <IconBrandGitlab size={20} color={theme.colors.orange[6]} />,
  };

  const profileMutation = useCommonProfileMutation<UpdateAvatarDTO>(
    '/api/profile/avatar',
    'POST',
    MUTATION_KEYS.PROFILE_AVATAR
  );

  const form = useForm({
    initialValues: {
      avatar_url: profile.avatar_url,
    },

    validate: {
      avatar_url: matches(
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        translate(content.pages.user.details.invalidUrl)
      ),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await profileMutation.mutateAsync({ avatar_url: values.avatar_url });

    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={translate(content.pages.user.details.modalAvatarInputNewLabel)}
        placeholder={translate(content.pages.user.details.modalAvatarInputNewPlaceholder)}
        mt="sm"
        {...form.getInputProps('avatar_url')}
      />

      {['github', 'gitlab'].includes(provider) && (
        <TextInput
          label={translate(content.pages.user.details.modalAvatarInputOldLabel)}
          description={translate(content.pages.user.details.modalAvatarInputOldDescription)}
          placeholder=""
          mt="lg"
          value={providerAvatar}
          onChange={() => {}}
          icon={providerIcon[provider] || null}
        />
      )}

      <Button fullWidth mt="xl" type="submit" loading={profileMutation.isLoading}>
        {translate(content.pages.user.details.modalAvatarBtn)}
      </Button>
    </form>
  );
};

export default AvatarModal;
