'use client';

import React from 'react';

import { Button, Center, Container, Divider, Paper, Text, Title } from '@mantine/core';

import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { IconMail } from '@tabler/icons-react';
import { useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

const ConfirmPage = () => {
  const translate = useTranslations();

  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Center h="calc(100dvh - 70px)">
      <Container size={460} style={{ width: '100%' }} my={40} px={0}>
        <Title ta="center" fw={700}>
          {translate('pages.auth_confirm.title')}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {translate('pages.auth_confirm.description')}
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Link href={'mailto:'} style={{ minWidth: isMobile ? '100%' : 'unset' }}>
            <Button variant="default" fullWidth leftSection={<IconMail style={getIconStyle(22)} />} size="md">
              {translate('pages.auth_confirm.openMailApp')}
            </Button>
          </Link>

          <Divider label="Or you can" labelPosition="center" my="xl" />

          <Link href={'/'}>
            <Button variant="light" fullWidth size="md">
              {translate('pages.auth_confirm.goBack')}
            </Button>
          </Link>
        </Paper>
      </Container>
    </Center>
  );
};

export default ConfirmPage;
