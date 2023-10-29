import { Flex, Text } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';
import React from 'react';
import useGlobalCtx from 'src/store/global/use-global-ctx';

const EmptyState = () => {
  const { translate, content } = useGlobalCtx();

  return (
    <Flex align="center" justify="center" mt={40} mb={20}>
      <IconInbox size={38} />

      <Text size="lg" ml="md">
        {translate(content.pages.user.teams.emptyState)}
      </Text>
    </Flex>
  );
};

export default EmptyState;
