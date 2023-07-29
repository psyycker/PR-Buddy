import { useState } from 'react';
import { useRepositoriesWithData } from 'contexts/pull-requests-context';
import EmptyContent from 'features/empty-content';
import useTabContent from 'hooks/use-tab-content';
import Header from 'components/header';
import { Container } from './home.styled.tsx';
import Tabs from './components/tabs';
import Content from './components/content';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<'All' | string>('All');
  const { repositories, isLoading } = useRepositoriesWithData();
  const { content } = useTabContent(selectedTab, repositories);

  if (content.length === 0) return <EmptyContent />;

  return (
    <Container>
      <Header canRefresh />
      <Tabs
        onClick={setSelectedTab}
        selectedTab={selectedTab}
        tabs={repositories.map((pr) => ({
          url: pr.repository.url,
          owner: pr.repository.owner.login,
          repo: pr.repository.name,
        }))}
      />
      <Content isLoading={isLoading} pullRequests={content} />
    </Container>
  );
};

export default Home;
