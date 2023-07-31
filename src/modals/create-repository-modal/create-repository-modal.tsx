import { Modal } from '@mantine/core';
import React from 'react';
import AddRepo from 'features/add-repo';
import type IRepository from 'types/repositories';
import { useRepositoriesActions } from 'contexts/repositories-context';

interface Props {
  show: boolean;
  close: () => void
}

const CreateRepositoryModal: React.FC<Props> = ({ show, close }: Props) => {
  const { addRepo } = useRepositoriesActions();
  const submitRepo = (newRepo: IRepository): void => {
    addRepo(newRepo);
    close();
  };

  return (
    <Modal
      size="sm"
      style={{ height: 300 }}
      title="Add a new repository"
      styles={{
        inner: {
          paddingRight: '0 !important',
          paddingLeft: '0 !important',
        },
      }}
      opened={show}
      onClose={close}
    >
      <AddRepo submitRepo={submitRepo} />
    </Modal>
  );
};

export default CreateRepositoryModal;
