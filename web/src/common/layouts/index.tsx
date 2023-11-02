'use client';

import { AppShell, MantineProvider } from '@mantine/core';

import Header from '@components/Header';

import { IFC } from '@ts/global.types';
import classes from './styles.module.scss';
import { useApiProfile } from 'src/api/profile/use-api-profile';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { THEME_MANTINE } from '@utils/resources/theme';
import { useAuthLogic } from '@store/auth';
import { useSupabaseLogic } from '@store/supabase/hooks/use-supabase-logic';
import { useApiTier } from 'src/api/tier/use-tier-query';

const AppLayout: React.FC<IFC> = ({ children }) => {
  // Updates profile on session change
  useApiProfile();
  useApiTier();
  useAuthLogic();
  useSupabaseLogic();

  return (
    <MantineProvider theme={THEME_MANTINE} defaultColorScheme="dark">
      <ModalsProvider>
        <Notifications />

        <AppShell
          header={{ height: { base: 60, sm: 70 }, offset: true }}
          classNames={{
            root: classes.app_root,
            main: classes.app_main,
            header: classes.app_header,
          }}
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default AppLayout;
