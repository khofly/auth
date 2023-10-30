import { useRouter } from 'next/navigation';

import { Text, Flex, useMantineTheme, useMantineColorScheme, Button, Image, Group } from '@mantine/core';

import classes from './styles.module.scss';
import { useTranslations } from '@store/global';
import { useAuthStore } from '@store/auth';

const Header = () => {
  const translate = useTranslations();
  const { redirectTo } = useAuthStore((state) => ({ redirectTo: state.redirectTo }));
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const router = useRouter();

  const logoColor = colorScheme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[7];

  return (
    <Group className={classes.header} align="center" h="100%" p="sm" px="lg" gap={0}>
      <Flex align="center" onClick={() => router.push('/auth/login')} style={{ cursor: 'pointer' }}>
        {/* <Image src={'https://khofly.com/assets/logo.svg'} alt="Khofly logo" width={38} /> */}

        <Text ml={12} fw={700} fz={20} c={logoColor}>
          {translate('header.appName')}
        </Text>
      </Flex>

      <div className={classes.divider}></div>

      {process.env.NODE_ENV === 'development' && <Text>{redirectTo}</Text>}

      {redirectTo && (
        <Button size="sm" ml="lg" onClick={() => window.location.replace(redirectTo)}>
          Go back
        </Button>
      )}
    </Group>
  );
};

export default Header;
