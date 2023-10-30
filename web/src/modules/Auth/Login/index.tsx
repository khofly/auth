'use client';

import React from 'react';

import { Center, Container } from '@mantine/core';
import LoginForm from './Form';

const LoginPage = () => {
  return (
    <Center h="calc(100dvh - 70px)">
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
