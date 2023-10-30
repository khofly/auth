'use client';

import React from 'react';
import { Title, Text, Button, Container, Center } from '@mantine/core';
import classes from './styles.module.scss';

import Link from 'next/link';
import { useTranslations } from '@store/global';

interface Props {
  code: 404 | 401 | 500;
  message?: string;
}

const ErrorPage: React.FC<Props> = ({ code, message }) => {
  const translate = useTranslations();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{code}</div>

      <Title className={classes.title}>{translate('pages.error.title')}</Title>

      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {message || translate(`pages.error.${code}`)}
      </Text>

      <Center>
        <Link href="/">
          <Button variant="subtle" size="md">
            {translate('pages.error.button')}
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

export default ErrorPage;
