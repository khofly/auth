import { Flex, Text } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';
import React from 'react';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';

const Unavailable = ({ tier }) => {
  const { translate, content } = useGlobalCtx();

  return (
    <Flex align="center" justify="center">
      <IconMoodSad size={26} />

      <Text size="md" ml="sm">
        {translate(content.pages.user.teams.unavailable)} {tier}
      </Text>
    </Flex>
  );
};

export default Unavailable;
