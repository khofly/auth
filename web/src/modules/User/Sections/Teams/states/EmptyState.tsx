import { Flex, Text } from '@mantine/core';
import { useTranslations } from '@store/global';
import { IconInbox } from '@tabler/icons-react';
import React from 'react';

const EmptyState = () => {
  const translate = useTranslations();

  return (
    <Flex align="center" justify="center" mt={40} mb={20}>
      <IconInbox size={38} />

      <Text size="lg" ml="md">
        {translate('pages.user.teams.emptyState')}
      </Text>
    </Flex>
  );
};

export default EmptyState;
