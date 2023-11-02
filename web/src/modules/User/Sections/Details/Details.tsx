import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Center,
  CopyButton,
  Divider,
  Flex,
  Group,
  Loader,
  Overlay,
  Paper,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';

import {
  IconAward,
  IconBrandGithub,
  IconBrandGitlab,
  IconCheck,
  IconCopy,
  IconDownload,
  IconEdit,
  IconIdBadge2,
  IconMail,
  IconSignature,
  IconUser,
} from '@tabler/icons-react';
import useDownload from '@hooks/use-download';
import { useResponsive } from '@hooks/use-responsive';
import { getTierData } from '@khofly/core';
import Link from 'next/link';
import { useState } from 'react';
import { openModal } from '@mantine/modals';
import AvatarModal from './modals/AvatarModal';
import RenameModal from './modals/RenameModal';
import { useGlobalStore, useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

const Details = () => {
  const translate = useTranslations();
  const { tier, loadingTier, profile, session } = useGlobalStore((state) => ({
    tier: state.tier,
    loadingTier: state.loadingProfile,
    profile: state.profile,
    session: state.session,
  }));

  const { jsFileDownload } = useDownload();
  const theme = useMantineTheme();
  const isSm = useResponsive('max', 'sm');

  const [overlay1, setOverlay1] = useState(false); // Avatar overlay
  const [overlay2, setOverlay2] = useState(false); // Display name overlay

  const avatarUrl = profile?.avatar_url;
  const username = profile?.display_name;

  const provider = session.user.app_metadata.provider;
  const providerIcon = {
    github: <IconBrandGithub size={24} />,
    gitlab: <IconBrandGitlab size={24} color={theme.colors.orange[6]} />,
    email: <IconSignature size={24} />,
  };

  const handleProfileAction = (type: 'display_name' | 'avatar_url') => {
    return openModal({
      title: (
        <Text size="lg" fw={600}>
          {
            {
              avatar_url: translate('pages.user.details.modalAvatarTitle'),
              display_name: translate('pages.user.details.modalNameTitle'),
            }[type]
          }
        </Text>
      ),
      centered: true,
      children: {
        avatar_url: <AvatarModal />,
        display_name: <RenameModal />,
      }[type],
    });
  };

  const handleDownload = () => {
    jsFileDownload({ text: JSON.stringify(session.user), filename: 'data.json' });
  };

  return (
    <Paper radius="md" p="xl" mb={60} withBorder>
      <Flex align="center" mb="xl">
        <IconUser style={getIconStyle(32)} />

        <Text fz={28} fw={600} ml="sm">
          {translate('pages.user.details.title')}
        </Text>
      </Flex>

      <Divider my="md" />

      <Flex
        align={isSm ? 'start' : 'center'}
        justify="space-between"
        direction={isSm ? 'column' : 'row'}
        gap="xl"
      >
        <Flex align="center">
          <Group
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setOverlay1(true)}
            onMouseLeave={() => setOverlay1(false)}
          >
            <Avatar size="xl" radius="xl" src={avatarUrl} />

            {overlay1 && (
              <Overlay
                color="#000"
                opacity={0.6}
                style={{ borderRadius: theme.radius.xl, zIndex: 99 }}
                onClick={() => handleProfileAction('avatar_url')}
              >
                <Center h="100%">
                  <IconEdit size={30} />
                </Center>
              </Overlay>
            )}
          </Group>

          <Flex direction="column" ml="md">
            {username && (
              <Flex
                align="center"
                mb="xs"
                onMouseEnter={() => setOverlay2(true)}
                onMouseLeave={() => setOverlay2(false)}
              >
                {providerIcon[provider]}

                <Text fw={600} size="xl" ml="xs" truncate>
                  {username}
                </Text>

                {overlay2 && (
                  <ActionIcon ml="md" onClick={() => handleProfileAction('display_name')}>
                    <IconEdit size="1.1rem" />
                  </ActionIcon>
                )}
              </Flex>
            )}

            <Flex align="center">
              <IconMail size={24} />

              <Text size="md" fw={500} c="dimmed" ml="xs" truncate>
                {session.user.email}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <div style={{ flex: 1 }}></div>

        <Button leftSection={<IconDownload style={getIconStyle(20)} />} onClick={handleDownload}>
          Download my data
        </Button>
      </Flex>

      <Divider my="md" />

      <Flex align="center" mt={30}>
        <IconIdBadge2 style={getIconStyle(28)} />

        <Text size="md" fw={500} mx="xs" truncate>
          Your ID:
        </Text>

        <TextInput
          w={380}
          value={session.user.id}
          onChange={() => {}}
          ml="xs"
          rightSection={
            <CopyButton value={session.user.id} timeout={2000}>
              {({ copied, copy }) => (
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                </ActionIcon>
              )}
            </CopyButton>
          }
        />
      </Flex>

      <Flex align="center" mt="xl">
        <IconAward style={getIconStyle(28)} />

        <Text size="md" fw={500} mx="xs" truncate>
          Your tier:
        </Text>

        {loadingTier ? (
          <Loader size="sm" />
        ) : (
          <Badge size="lg" color={getTierData(tier, theme).mColor} miw={35} ml="xs" variant="dot">
            {getTierData(tier, theme).label}
          </Badge>
        )}
        <Link href="https://khofly.com/rewards" target="_blank">
          <Button size="xs" ml="xl" variant="light">
            Learn more
          </Button>
        </Link>
      </Flex>
    </Paper>
  );
};

export default Details;
