'use client';

import React from 'react';

import { Center } from '@mantine/core';
import RegisterForm from './Form';

const RegisterPage = () => {
  return (
    <Center h="calc(100dvh - 70px)">
      <RegisterForm />
    </Center>
  );
};

export default RegisterPage;
