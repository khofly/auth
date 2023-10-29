import { useRouter } from 'next/router';

import {
  Header,
  Text,
  Flex,
  useMantineTheme,
  useMantineColorScheme,
  MediaQuery,
  Button,
  Image,
} from '@mantine/core';

import useGlobalCtx from 'src/store/global/use-global-ctx';
import useAuthCtx from 'src/store/auth/use-auth-ctx';

const AppHeader = () => {
  const { translate, content } = useGlobalCtx();
  const { redirectTo } = useAuthCtx();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const router = useRouter();

  const logoColor = colorScheme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[7];

  return (
    <Header height={{ base: 60, md: 70 }} p="md" px="xl">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Flex align="center" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <Image src={'https://fossly.tech/assets/logo.svg'} alt="Fossly logo" width={38} />

          <Text ml={12} fw={700} size={20} color={logoColor}>
            {translate(content.header.appName)}
          </Text>
        </Flex>

        <div style={{ flex: 1 }}></div>

        {process.env.NODE_ENV === 'development' && <Text>{redirectTo}</Text>}

        {redirectTo && (
          <Button size="sm" ml="lg" onClick={() => window.location.replace(redirectTo)}>
            Go back
          </Button>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
