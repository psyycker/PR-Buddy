import { createStyles, Tabs } from '@mantine/core';
import { type FC, useState } from 'react';
import GithubTokenSettingsTab from 'features/github-token-settings-tab';
import RepositoriesSettingsTab from 'features/repositories-settings-tab';
import GeneralSettingsTab from 'features/general-settings-tab';
import { Container } from './settings-window.styled';

const useStyles = createStyles({
  tabContent: {
    display: 'flex',
    width: '98%',
    flexDirection: 'column',
    margin: '10px auto',
  },
});

const SettingsWindow: FC = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>('general');
  return (
    <Container>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="repositories">Repositories</Tabs.Tab>
          <Tabs.Tab value="github-token">Github Token</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel className={classes.tabContent} value="general">
          <GeneralSettingsTab />
        </Tabs.Panel>
        <Tabs.Panel className={classes.tabContent} value="repositories">
          <RepositoriesSettingsTab />
        </Tabs.Panel>
        <Tabs.Panel className={classes.tabContent} value="github-token">
          <GithubTokenSettingsTab />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default SettingsWindow;
