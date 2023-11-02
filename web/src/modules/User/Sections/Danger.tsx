import { Button, Divider, Flex, Paper, Text, useMantineTheme } from '@mantine/core';

import classes from './styles.module.scss';

import { IconAlertTriangle, IconTrash, IconFileText } from '@tabler/icons-react';
import { useApiAuth } from 'src/api/auth/use-api-auth';
import { openConfirmModal } from '@mantine/modals';
import { useResponsive } from '@hooks/use-responsive';
import { useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

const Danger = () => {
  const translate = useTranslations();

  const theme = useMantineTheme();
  const isSm = useResponsive('max', 'sm');
  const { auth_deleteAccount, isLoading: isLoading2 } = useApiAuth();

  // Delete account confirmation
  const openDeleteAccModal = () =>
    openConfirmModal({
      title: (
        <Text size="lg" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: <Text size="sm">{translate('pages.user.danger.deleteAccDescription')}</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onCancel: () => {},
      onConfirm: () => auth_deleteAccount(),
      confirmProps: { color: 'red' },
      centered: true,
    });

  return (
    <Paper radius="md" p="xl" withBorder className={classes.paper}>
      <Flex align="center" mb="xl">
        <IconAlertTriangle style={getIconStyle(32)} color={theme.colors.red[6]} />

        <Text fz={28} fw={600} ml="sm">
          {translate('pages.user.danger.title')}
        </Text>
      </Flex>

      <Divider my="md" />

      <Flex
        align={isSm ? 'start' : 'center'}
        justify="space-between"
        direction={isSm ? 'column' : 'row'}
        gap="xl"
      >
        <Text size="md" fw={400} w={isSm ? '100%' : '50%'}>
          {translate('pages.user.danger.deleteAccDescription')}
        </Text>

        <Button
          color="red"
          leftSection={<IconTrash style={getIconStyle(20)} />}
          onClick={openDeleteAccModal}
          loading={isLoading2}
        >
          {translate('pages.user.danger.deleteAccButton')}
        </Button>
      </Flex>
    </Paper>
  );
};

export default Danger;
