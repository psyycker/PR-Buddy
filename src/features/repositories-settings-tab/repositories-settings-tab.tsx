import { Button, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import CreateRepositoryModal from 'modals/create-repository-modal';
import { useRepositories } from 'contexts/repositories-context';
import Row from './components/row';
import { Container, Header } from './repositories-settings-tab.styled';

const RepositoriesSettingsTab: React.FC = () => {
  const [showModal, { open, close }] = useDisclosure(false);
  const { repositories } = useRepositories();
  return (
    <>
      <CreateRepositoryModal close={close} show={showModal} />
      <Container>
        <Header>
          <h4>Repositories</h4>
          <Button onClick={open} variant="outline">Add</Button>
        </Header>
        <Table>
          <thead>
            <tr>
              <th>Repository</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {repositories.map(({
              owner,
              url,
              repo,
              enabled,
            }) => (
              <Row
                key={url}
                repository={repo}
                owner={owner}
                url={url}
                enabled={enabled}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default RepositoriesSettingsTab;
