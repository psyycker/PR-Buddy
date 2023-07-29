import { type FC } from 'react';
import { Button, Modal } from '@mantine/core';
import { useRepositoriesActions } from 'contexts/repositories-context';
import { Container, Buttons } from './delete-repository-modal.styled';

interface IProps {
  show: boolean;
  close: () => void;
  url: string
}

const DeleteRepositoryModal: FC<IProps> = ({ show, close, url }: IProps) => {
  const { removeRepo } = useRepositoriesActions();

  const onDelete = (): void => {
    removeRepo(url);
    close();
  };

  const onCancel = (): void => {
    close();
  };

  return (
    <Modal onClose={close} opened={show}>
      <Container>
        Do you want to remove the repository?
        <Buttons>
          <Button onClick={onDelete}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </Buttons>
      </Container>
    </Modal>
  );
};

export default DeleteRepositoryModal;
