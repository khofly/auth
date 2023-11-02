import { Flex, Text } from '@mantine/core';
import { useTranslations } from '@store/global';
import { IconMoodSad } from '@tabler/icons-react';
import React from 'react';

const Unavailable = ({ tier }) => {
  const translate = useTranslations();

  return (
    <Flex align="center" justify="center">
      <IconMoodSad size={26} />

      <Text size="md" ml="sm">
        {translate('pages.user.teams.unavailable')} {tier}
      </Text>
    </Flex>
  );
};

export default Unavailable;
