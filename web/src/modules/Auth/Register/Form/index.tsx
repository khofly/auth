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
  useMantineTheme,
} from '@mantine/core';

import Link from 'next/link';
import { useForm, isEmail, matches } from '@mantine/form';
import { REGEX_PASSWORD } from '@utils/constants/auth';

import { initialValues, RegisterFormProps } from './types';
import AuthButton from '@module/Auth/Login/AuthButton/AuthButton';
import { generateRandomPassword } from '@utils/functions/randomPassword';
import PasswordStrength from '../../PasswordStrength/PasswordStrength';
import { useApiAuth } from 'src/api/auth/use-api-auth';

import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconBrandGithub,
  IconBrandGitlab,
  IconRefresh,
} from '@tabler/icons-react';
import { useTranslations } from '@store/global';
import classes from './styles.module.scss';
import { getIconStyle } from '@utils/functions/iconStyle';

const RegisterForm: React.FC<RegisterFormProps> = ({ withTitle = true }) => {
  const translate = useTranslations();
  const theme = useMantineTheme();
  const { auth_signUp, auth_signInWithProvider, isLoading } = useApiAuth();

  const form = useForm({
    initialValues,
    validate: {
      email: isEmail(translate('pages.auth_register.errors.email')),
      password: matches(REGEX_PASSWORD, translate('pages.auth_register.errors.password')),
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
          <Title ta="center" fw={700}>
            {translate('pages.auth_register.title')}
          </Title>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {translate('pages.auth_register.yesAccount')}{' '}
            <Link href="/auth/login" style={{ color: theme.colors.blue[4] }}>
              {translate('pages.auth_register.loginCta')}
            </Link>
          </Text>
        </>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={translate('pages.auth_register.mailLabel')}
            placeholder={translate('pages.auth_register.mailPlaceholder')}
            required
            {...form.getInputProps('email')}
            leftSection={<IconMail style={getIconStyle(22)} />}
            mb="xs"
            size="md"
          />

          <Group className={classes.group} gap={0}>
            <PasswordStrength value={form.values.password}>
              <PasswordInput
                label={translate('pages.auth_register.passwordLabel')}
                placeholder={translate('pages.auth_register.passwordPlaceholder')}
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
                leftSection={<IconLock style={getIconStyle(22)} />}
                className={classes.input}
                size="md"
                mr="md"
              />
            </PasswordStrength>

            <Tooltip label={translate('pages.auth_register.generateTooltip')} withArrow arrowSize={3}>
              <ThemeIcon className={classes.resetIcon} onClick={handleUseGenerated} size={42} color="gray">
                <IconRefresh style={getIconStyle(24)} />
              </ThemeIcon>
            </Tooltip>
          </Group>

          <Button fullWidth mt="lg" type="submit" loading={isLoading} size="md">
            {translate('pages.auth_register.button')}
          </Button>
        </form>

        <Divider label="Or continue with:" labelPosition="center" my={26} />

        <Group grow>
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

export default RegisterForm;
