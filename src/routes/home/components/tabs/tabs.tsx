import {Container, Tab} from "./tabs.styled.tsx";

type Props = {
    tabs: {
        url: string;
        owner: string;
        repo: string
    }[],
    onClick: (newTab: string | 'All') => void,
    selectedTab: 'All' | string
}
const Tabs = ({tabs, onClick, selectedTab}: Props) => {
    return <Container>
        <Tab selected={selectedTab === 'All'} onClick={() => onClick('All')} key="all">All</Tab>
        {tabs.map(({url, repo, owner}) => <Tab selected={selectedTab === url} onClick={() => onClick(url)} key={url}>{owner}/{repo}</Tab>)}
    </Container>
};

export default Tabs;
