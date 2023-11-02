'use client';

import { Center, Container, Loader } from '@mantine/core';
import React from 'react';
import Danger from './Sections/Danger';
import Details from './Sections/Details/Details';
import Teams from './Sections/Teams/Teams';
import { useGlobalStore } from '@store/global';

const Profile = () => {
  const { profile } = useGlobalStore((state) => ({ profile: state.profile }));

  if (!profile) {
    return (
      <Center h="100%">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl" mt={40} mb={40}>
      <Details />

      <Teams />

      <Danger />
    </Container>
  );
};

export default Profile;
