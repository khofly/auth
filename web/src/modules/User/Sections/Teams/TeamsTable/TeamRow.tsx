import { ActionIcon, Avatar, Button, Flex, Group, Menu, Table, Text, rem } from '@mantine/core';
import React, { Dispatch } from 'react';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IconDots, IconTrash, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import { openModal } from '@mantine/modals';
import DeleteModal from '../modals/DeleteModal';
import { useTranslations } from '@store/global';
import { getIconStyle } from '@utils/functions/iconStyle';

dayjs.extend(relativeTime);

interface Props extends ITeamWithAdmin {
  setOpenTeam: Dispatch<ITeamWithAdmin>;
  setPage: Dispatch<number>;
}

const TeamRow: React.FC<Props> = ({
  admin,
  created_at,
  name,
  updated_at,
  id,
  admin_id,
  setPage,
  setOpenTeam,
}) => {
  const translate = useTranslations();

  const handleTeamAction = (type: 'delete' | 'name') => {
    return openModal({
      title: (
        <Text size="lg" fw={600}>
          {
            {
              delete: translate('pages.user.teams.teamsTable.modalDeleteTitle'),
              // name: translate(content.pages.user.teams.teamsTable.modalNameTitle),
            }[type]
          }
        </Text>
      ),
      centered: true,
      children: {
        delete: <DeleteModal id={id} setPage={setPage} />,
        // name: <RenameModal id={id} name={name} />,
      }[type],
    });
  };

  return (
    <Table.Tr>
      <Table.Td>
        <Flex align="center">
          <IconUsers />

          <Text ml="xs" fz={rem(14)} fw={700}>
            {name}
          </Text>
        </Flex>
      </Table.Td>

      <Table.Td>
        <Flex align="center">
          <Avatar src={admin.avatar_url} alt={`${admin.display_name}'s avatar`} radius="xl" />

          <Text ml="xs" size={rem(14)} fw={600}>
            {admin.display_name}
          </Text>
        </Flex>
      </Table.Td>

      <Table.Td>
        <Text>{dayjs(created_at).fromNow()}</Text>
      </Table.Td>

      <Table.Td>
        <Text>{dayjs(updated_at).fromNow()}</Text>
      </Table.Td>

      <Table.Td align="right">
        <Group gap="sm">
          <Button
            size="xs"
            onClick={() => setOpenTeam({ admin, admin_id, created_at, id, name, updated_at })}
          >
            Open
          </Button>

          <Menu withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="light" size="lg">
                <IconDots size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Item icon={<IconEdit size={20} />} onClick={() => handleDocAction('name')}>
                {translate(content.pages.doc_my.actionRename)}
              </Menu.Item> */}

              <Menu.Item
                leftSection={<IconTrash style={getIconStyle(20)} />}
                color="red"
                onClick={() => handleTeamAction('delete')}
              >
                {translate('pages.user.teams.teamsTable.actionDelete')}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default TeamRow;
