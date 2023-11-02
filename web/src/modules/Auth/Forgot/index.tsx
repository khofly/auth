'use client';

import React from 'react';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Center,
  useMantineTheme,
} from '@mantine/core';

import classes from './styles.module.scss';
import Link from 'next/link';
import { useForm, isEmail } from '@mantine/form';
import { useApiAuth } from 'src/api/auth/use-api-auth';

import { IconMail, IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

const ForgotPassword = () => {
  const translate = useTranslations();
  const theme = useMantineTheme();
  const { auth_forgotPassword } = useApiAuth();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail(translate('pages.auth_forgot.errors.email')),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    auth_forgotPassword(values.email);
  };

  return (
    <Center h="calc(100dvh - 70px)">
      <Container className={classes.form} size={460} my={30} px={0}>
        <Title ta="center" fw={700}>
          {translate('pages.auth_forgot.title')}
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {translate('pages.auth_forgot.subtitle')}
        </Text>

        <Paper className={classes.form} withBorder shadow="md" p={30} radius="md" mt="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              leftSection={<IconMail style={getIconStyle(22)} />}
              label={translate('pages.auth_forgot.mailLabel')}
              placeholder={translate('pages.auth_forgot.mailPlaceholder')}
              required
              {...form.getInputProps('email')}
              size="md"
            />

            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Link href="/auth/login" className={classes.control}>
                <Center inline style={{ cursor: 'pointer', color: theme.colors.blue[6] }}>
                  <IconArrowLeft style={getIconStyle(18)} />

                  <Text size="sm" ml={4}>
                    {translate('pages.auth_forgot.toLogin')}
                  </Text>
                </Center>
              </Link>

              <Button className={classes.control} type="submit" size="md">
                {translate('pages.auth_forgot.button')}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Center>
  );
};

export default ForgotPassword;
