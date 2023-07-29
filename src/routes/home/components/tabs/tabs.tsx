import { type FC } from 'react';
import { Container, Tab } from './tabs.styled';

interface Props {
    tabs: Array<{
        url: string;
        owner: string;
        repo: string
    }>,
    onClick: (newTab: string | 'All') => void,
    selectedTab: 'All' | string
}
const Tabs: FC<Props> = ({ tabs, onClick, selectedTab }: Props) => (
  <Container>
    <Tab selected={selectedTab === 'All'} onClick={() => { onClick('All'); }} key="all">All</Tab>
    {tabs.map(
      ({
        url,
        repo,
        owner,
      }) => (
        <Tab selected={selectedTab === url} onClick={() => { onClick(url); }} key={url}>
          {owner}
          /
          {repo}
        </Tab>
      ),
    )}
  </Container>
);

export default Tabs;
