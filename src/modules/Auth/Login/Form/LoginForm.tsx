import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
} from '@mantine/core';

import Link from 'next/link';
import { useForm, isEmail, matches } from '@mantine/form';

import { initialValues, LoginFormProps } from './types';
import useStyles from './LoginForm.styles';
import AuthButton from '../AuthButton/AuthButton';
import { useApiAuth } from 'src/api/auth/use-api-auth';
import useGlobalCtx from 'src/store/global/use-global-ctx';
import { REGEX_PASSWORD } from '@utils/constants/auth';

import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGithub,
  IconBrandGitlab,
} from '@tabler/icons-react';

const LoginForm: React.FC<LoginFormProps> = ({ withTitle = true }) => {
  const { translate, content } = useGlobalCtx();
  const { classes, theme } = useStyles();
  const { auth_signInWithPassword, auth_signInWithProvider, isLoading } = useApiAuth();

  const form = useForm({
    initialValues,
    validate: {
      email: isEmail(translate(content.pages.auth_login.errors.email)),
      password: matches(REGEX_PASSWORD, translate(content.pages.auth_login.errors.password)),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    auth_signInWithPassword(values);
  };

  return (
    <Container className={classes.form} size={460} my={40} px={0}>
      {withTitle && (
        <>
          <Title align="center" sx={() => ({ fontWeight: 900 })}>
            {translate(content.pages.auth_login.title)}
          </Title>

          <Text color="dimmed" size="sm" align="center" mt={5}>
            {translate(content.pages.auth_login.noAccount)}{' '}
            <Link href="/auth/register" style={{ color: theme.colors.blue[4] }}>
              {translate(content.pages.auth_login.registerCta)}
            </Link>
          </Text>
        </>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={translate(content.pages.auth_login.mailLabel)}
            placeholder={translate(content.pages.auth_login.mailPlaceholder)}
            required
            {...form.getInputProps('email')}
            icon={<IconMail size={22} />}
            size="md"
          />

          <Group position="apart" mt="xs">
            <Text component="label" htmlFor="your-password" size="md" weight={500}>
              {translate(content.pages.auth_login.passwordLabel)}
              <Text component="span" size="md" weight={500} color="red" ml={4}>
                *
              </Text>
            </Text>

            <Text size="sm" color="blue.4">
              <Link href="/auth/forgot">{translate(content.pages.auth_login.forgot)}</Link>
            </Text>
          </Group>

          <PasswordInput
            // label={translate(content.pages.auth_login.passwordLabel)}
            id="your-password"
            placeholder={translate(content.pages.auth_login.passwordPlaceholder)}
            required
            {...form.getInputProps('password')}
            visibilityToggleIcon={({ reveal }) => (reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />)}
            styles={{
              visibilityToggle: {
                marginRight: 12,
              },
            }}
            icon={<IconLock size={22} />}
            size="md"
          />

          <Button fullWidth mt="xl" type="submit" loading={isLoading} size="md">
            {translate(content.pages.auth_login.button)}
          </Button>
        </form>

        <Divider label="Or continue with:" labelPosition="center" my="lg" />

        <Group grow mt="xl">
          <AuthButton
            leftIcon={<IconBrandGithub size={22} />}
            radius="xl"
            onClick={() => auth_signInWithProvider('github')}
            size="md"
          >
            {translate(content.pages.auth_login.buttonGH)}
          </AuthButton>
          <AuthButton
            leftIcon={<IconBrandGitlab size={22} color={theme.colors.orange[6]} />}
            radius="xl"
            onClick={() => auth_signInWithProvider('gitlab')}
            size="md"
          >
            {translate(content.pages.auth_login.buttonGL)}
          </AuthButton>
        </Group>
      </Paper>
    </Container>
  );
};

export default LoginForm;
