'use client';

import { Button, Center, Container, Divider, Paper, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslations } from '@store/global';
import { IconUser } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import Link from 'next/link';
import React from 'react';

const Deleted = () => {
  const translate = useTranslations();

  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Center h="calc(100dvh - 70px)">
      <Container size={460} style={{ width: '100%' }} my={40} px={0}>
        <Title ta="center" fw={700}>
          {translate('pages.user_deleted.title')}
        </Title>
        {/* <Text color="dimmed" size="sm" align="center" mt={5}>
          {translate(content.pages.auth_confirm.description)}
        </Text> */}

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Link href={'/auth/register'} style={{ minWidth: isMobile ? '100%' : 'unset' }}>
            <Button variant="default" fullWidth leftSection={<IconUser style={getIconStyle(22)} />} size="md">
              {translate('pages.user_deleted.newAcc')}
            </Button>
          </Link>

          <Divider label="Or you can" labelPosition="center" my="xl" />

          <Link href={'/'}>
            <Button variant="light" fullWidth size="md">
              {translate('pages.user_deleted.goBack')}
            </Button>
          </Link>
        </Paper>
      </Container>
    </Center>
  );
};

export default Deleted;
