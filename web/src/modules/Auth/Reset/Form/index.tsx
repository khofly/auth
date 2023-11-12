import React from 'react';
import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';

import classes from './styles.module.scss';
import { useForm, matches } from '@mantine/form';
import { initialValues } from './types';
import { REGEX_PASSWORD } from '@utils/constants/auth';
import PasswordStrength from '@module/Auth/PasswordStrength/PasswordStrength';
import { generateRandomPassword } from '@utils/functions/randomPassword';
import { useApiAuth } from 'src/api/auth/use-api-auth';

import { IconLock, IconEye, IconEyeOff, IconRefresh } from '@tabler/icons-react';
import { useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

const ResetForm = () => {
  const translate = useTranslations();
  const { auth_resetPassword, isLoading } = useApiAuth();

  const form = useForm({
    initialValues,
    validate: {
      password1: matches(REGEX_PASSWORD, translate('pages.auth_reset.errors.password1')),
      password2: (value, { password1 }) =>
        value !== password1 ? translate('pages.auth_reset.errors.password2') : null,
    },
  });

  const handleUseGenerated = () => {
    const randomPassword = generateRandomPassword(14);

    form.setFieldValue('password1', randomPassword);
    form.setFieldValue('password2', randomPassword);
  };

  const handleSubmit = (values: typeof form.values) => {
    auth_resetPassword(values.password1);
  };

  return (
    <Container className={classes.form} size={460} my={40} px={0}>
      <Title ta="center" fw={700}>
        {translate('pages.auth_reset.title')}
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {translate('pages.auth_reset.subtitle')}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group className={classes.group}>
            <PasswordStrength value={form.values.password1}>
              <PasswordInput
                label={translate('pages.auth_reset.password1Label')}
                placeholder={translate('pages.auth_reset.password1Placeholder')}
                required
                {...form.getInputProps('password1')}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />
                }
                styles={{
                  visibilityToggle: {
                    marginRight: 12,
                  },
                }}
                leftSection={<IconLock style={getIconStyle(22)} />}
                className={classes.input}
                size="md"
              />
            </PasswordStrength>

            <Tooltip label={translate('pages.auth_reset.generateTooltip')} withArrow arrowSize={3}>
              <ThemeIcon className={classes.resetIcon} onClick={handleUseGenerated} size={42} color="gray">
                <IconRefresh size={24} />
              </ThemeIcon>
            </Tooltip>
          </Group>

          <PasswordInput
            label={translate('pages.auth_reset.password2Label')}
            placeholder={translate('pages.auth_reset.password2Placeholder')}
            required
            {...form.getInputProps('password2')}
            mt="xs"
            visibilityToggleIcon={({ reveal }) => (reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />)}
            styles={{
              visibilityToggle: {
                marginRight: 12,
              },
            }}
            leftSection={<IconLock style={getIconStyle(22)} />}
            size="md"
          />

          <Button fullWidth mt="lg" type="submit" loading={isLoading} size="md">
            {translate('pages.auth_reset.button')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetForm;