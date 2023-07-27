import {Container, Tab} from "./tabs.styled.tsx";

type Props = {
    tabs: {
        repo: string;
        owner: string;
    }[],
    onClick: (newTab: {repo: string; owner: string} | 'All') => void,
    selectedTab: 'All' | {repo: string; owner: string}
}
const Tabs = ({tabs, onClick, selectedTab}: Props) => {
    return <Container>
        <Tab selected={selectedTab === 'All'} onClick={() => onClick('All')} key="all">All</Tab>
        {tabs.map(({repo, owner}) => <Tab selected={typeof selectedTab !== 'string' && selectedTab.repo === repo && selectedTab.owner === owner} onClick={() => onClick({repo, owner})} key={owner+repo}>{owner}/{repo}</Tab>)}
    </Container>
};

export default Tabs;
