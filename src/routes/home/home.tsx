import {
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRepositoriesWithData } from 'contexts/pull-requests-context';
import EmptyContent from 'features/empty-content';
import useTabContent from 'hooks/use-tab-content';
import Header from 'components/header';
import PullRequestsList from 'features/pull-requests-list';
import { LoadingOverlay } from '@mantine/core';
import { Container } from './home.styled';
import Tabs from './components/tabs';

const Home: FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<'All' | string>('All');
  const { repositories, isLoading } = useRepositoriesWithData();
  const { content } = useTabContent(selectedTab, repositories);

  useEffect(() => {
    if (isLoading) {
      headerRef.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [isLoading]);

  if (repositories.length === 0 && !isLoading) return <EmptyContent />;

  return (
    <Container>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
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
      <PullRequestsList ref={headerRef} pullRequests={content} />
    </Container>
  );
};

export default Home;
