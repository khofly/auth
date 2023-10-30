import { ActionIcon, Avatar, Button, Flex, Group, Menu, Text, rem } from '@mantine/core';
import React, { Dispatch } from 'react';
import { ITeamWithAdmin } from 'src/api/team/use-team-query';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IconArrowRight, IconDots, IconTrash, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import useGlobalCtx from 'src/store/ol-global/use-global-ctx';
import { openModal } from '@mantine/modals';
import DeleteModal from '../modals/DeleteModal';

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
  const { translate, content } = useGlobalCtx();

  const handleTeamAction = (type: 'delete' | 'name') => {
    return openModal({
      title: (
        <Text size="lg" fw={600}>
          {
            {
              delete: translate(content.pages.user.teams.teamsTable.modalDeleteTitle),
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
    <tr>
      <td>
        <Flex align="center">
          <IconUsers />

          <Text ml="xs" size={rem(14)} weight={600}>
            {name}
          </Text>
        </Flex>
      </td>

      <td>
        <Flex align="center">
          <Avatar src={admin.avatar_url} alt={`${admin.display_name}'s avatar`} radius="xl" />

          <Text ml="xs" size={rem(14)} weight={600}>
            {admin.display_name}
          </Text>
        </Flex>
      </td>

      <td>{dayjs(created_at).fromNow()}</td>

      <td>{dayjs(updated_at).fromNow()}</td>

      <td align="right">
        <Group spacing="sm" position="right">
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
                icon={<IconTrash size={20} />}
                color="red"
                onClick={() => handleTeamAction('delete')}
              >
                {translate(content.pages.user.teams.teamsTable.actionDelete)}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  );
};

export default TeamRow;
