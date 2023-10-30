import React from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  useMantineTheme,
} from '@mantine/core';

import Link from 'next/link';
import { useForm, isEmail, matches } from '@mantine/form';

import { initialValues, LoginFormProps } from './types';
import AuthButton from '../AuthButton/AuthButton';
import { useApiAuth } from 'src/api/auth/use-api-auth';
import { REGEX_PASSWORD } from '@utils/constants/auth';

import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGithub,
  IconBrandGitlab,
} from '@tabler/icons-react';
import { useTranslations } from '@store/global';
import classes from './styles.module.scss';
import { getIconStyle } from '@utils/functions/iconStyle';

const LoginForm: React.FC<LoginFormProps> = ({ withTitle = true }) => {
  const translate = useTranslations();
  const theme = useMantineTheme();
  const { auth_signInWithPassword, auth_signInWithProvider, isLoading } = useApiAuth();

  const form = useForm({
    initialValues,
    validate: {
      email: isEmail(translate('pages.auth_login.errors.email')),
      password: matches(REGEX_PASSWORD, translate('pages.auth_login.errors.password')),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    auth_signInWithPassword(values);
  };

  return (
    <Container w={460} size={460} my={40} px={0}>
      {withTitle && (
        <>
          <Title ta="center" className={classes.title}>
            {translate('pages.auth_login.title')}
          </Title>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {translate('pages.auth_login.noAccount')}{' '}
            <Link href="/auth/register" style={{ color: theme.colors.blue[4] }}>
              {translate('pages.auth_login.registerCta')}
            </Link>
          </Text>
        </>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={translate('pages.auth_login.mailLabel')}
            placeholder={translate('pages.auth_login.mailPlaceholder')}
            required
            {...form.getInputProps('email')}
            leftSection={<IconMail style={getIconStyle(22)} />}
            size="md"
          />

          <Group justify="space-between" mt="xs">
            <Text component="label" htmlFor="your-password" size="md" fw={500}>
              {translate('pages.auth_login.passwordLabel')}
              <Text component="span" size="md" fw={500} c="red" ml={4}>
                *
              </Text>
            </Text>

            <Text size="sm" c="blue.4">
              <Link href="/auth/forgot">{translate('pages.auth_login.forgot')}</Link>
            </Text>
          </Group>

          <PasswordInput
            // label={translate(content.pages.auth_login.passwordLabel)}
            id="your-password"
            placeholder={translate('pages.auth_login.passwordPlaceholder')}
            required
            {...form.getInputProps('password')}
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
            {translate('pages.auth_login.button')}
          </Button>
        </form>

        <Divider label="Or continue with:" labelPosition="center" my={26} />

        <Group grow mt="lg">
          <AuthButton
            leftSection={<IconBrandGithub style={getIconStyle(22)} />}
            radius="xl"
            onClick={() => auth_signInWithProvider('github')}
            size="md"
          >
            {translate('pages.auth_login.buttonGH')}
          </AuthButton>
          <AuthButton
            leftSection={<IconBrandGitlab style={getIconStyle(22)} color={theme.colors.orange[6]} />}
            radius="xl"
            onClick={() => auth_signInWithProvider('gitlab')}
            size="md"
          >
            {translate('pages.auth_login.buttonGL')}
          </AuthButton>
        </Group>
      </Paper>
    </Container>
  );
};

export default LoginForm;
