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
  Tooltip,
  ThemeIcon,
} from '@mantine/core';

import Link from 'next/link';
import { useForm, isEmail, matches } from '@mantine/form';
import { REGEX_PASSWORD } from '@utils/constants/auth';

import { initialValues, RegisterFormProps } from './types';
import useStyles from './RegisterForm.styles';
import AuthButton from '@module/Auth/Login/AuthButton/AuthButton';
import { generateRandomPassword } from '@utils/functions/randomPassword';
import PasswordStrength from '../../PasswordStrength/PasswordStrength';
import { useApiAuth } from 'src/api/auth/use-api-auth';
import useGlobalCtx from 'src/store/global/use-global-ctx';

import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGithub,
  IconBrandGitlab,
  IconRefresh,
} from '@tabler/icons-react';

const RegisterForm: React.FC<RegisterFormProps> = ({ withTitle = true }) => {
  const { translate, content } = useGlobalCtx();
  const { classes, theme } = useStyles();
  const { auth_signUp, auth_signInWithProvider, isLoading } = useApiAuth();

  const form = useForm({
    initialValues,
    validate: {
      email: isEmail(translate(content.pages.auth_register.errors.email)),
      password: matches(REGEX_PASSWORD, translate(content.pages.auth_register.errors.password)),
    },
  });

  const handleUseGenerated = () => {
    form.setFieldValue('password', generateRandomPassword(14));
  };

  const handleSubmit = (values: typeof form.values) => {
    auth_signUp(values);
  };

  return (
    <Container className={classes.form} size={460} my={40} px={0}>
      {withTitle && (
        <>
          <Title align="center" sx={() => ({ fontWeight: 900 })}>
            {translate(content.pages.auth_register.title)}
          </Title>

          <Text color="dimmed" size="sm" align="center" mt={5}>
            {translate(content.pages.auth_register.yesAccount)}{' '}
            <Link href="/auth/login" style={{ color: theme.colors.blue[4] }}>
              {translate(content.pages.auth_register.loginCta)}
            </Link>
          </Text>
        </>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={translate(content.pages.auth_register.mailLabel)}
            placeholder={translate(content.pages.auth_register.mailPlaceholder)}
            required
            {...form.getInputProps('email')}
            icon={<IconMail size={22} />}
            mb="md"
            size="md"
          />

          <Group className={classes.group}>
            <PasswordStrength value={form.values.password}>
              <PasswordInput
                label={translate(content.pages.auth_register.passwordLabel)}
                placeholder={translate(content.pages.auth_register.passwordPlaceholder)}
                required
                {...form.getInputProps('password')}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <IconEye size={20} /> : <IconEyeOff size={20} />
                }
                styles={{
                  visibilityToggle: {
                    marginRight: 12,
                  },
                }}
                icon={<IconLock size={22} />}
                className={classes.input}
                size="md"
              />
            </PasswordStrength>

            <Tooltip label={translate(content.pages.auth_register.generateTooltip)} withArrow arrowSize={3}>
              <ThemeIcon className={classes.resetIcon} onClick={handleUseGenerated} size={42} color="gray">
                <IconRefresh size={24} />
              </ThemeIcon>
            </Tooltip>
          </Group>

          <Button fullWidth mt="xl" type="submit" loading={isLoading} size="md">
            {translate(content.pages.auth_register.button)}
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

export default RegisterForm;
