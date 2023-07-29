import { ActionIcon, Group } from '@mantine/core';
import {
  IconTrash,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-react';
import { type FC } from 'react';
import { useDisclosure } from '@mantine/hooks';
import DeleteRepositoryModal from 'modals/delete-repository-modal';
import { useRepositoriesActions } from 'contexts/repositories-context.tsx';

interface IProps {
  repository: string;
  owner: string;
  url: string;
  enabled: boolean;
}

const Row: FC<IProps> = ({
  repository,
  url,
  enabled,
  owner,
}: IProps) => {
  const [show, { open, close }] = useDisclosure(false);

  const { toggleRepoStatus } = useRepositoriesActions();

  return (
    <>
      <tr>
        <td>{repository}</td>
        <td>{owner}</td>
        <td>{enabled ? 'Enabled' : 'Disabled'}</td>
        <td>
          <Group spacing={0} position="left">
            <ActionIcon color="red">
              <IconTrash onClick={open} size={20} stroke={1.5} />
            </ActionIcon>
            <ActionIcon onClick={() => { toggleRepoStatus(url); }}>
              {enabled && <IconPlayerPause size={20} stroke={1.5} />}
              {!enabled && <IconPlayerPlay size={20} stroke={1.5} />}
            </ActionIcon>
          </Group>
        </td>
      </tr>
      <DeleteRepositoryModal show={show} close={close} url={url} />
    </>
  );
};

export default Row;
