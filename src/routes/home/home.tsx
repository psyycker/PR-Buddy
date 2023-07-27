import {Link} from "react-router-dom";
import {Container, SettingsContainer} from "./home.styled.tsx";
import Tabs from "./components/tabs";
import {useState} from "react";
import useTabContent from "../../hooks/use-tab-content.ts";
import Content from "./components/content";
import {useRepositoriesWithData} from "../../contexts/pull-requests-context.tsx";

const Home = () => {
    const [selectedTab, setSelectedTab] = useState<'All' | {owner: string; repo: string}>('All')
    const repositories = useRepositoriesWithData()
    const {content} = useTabContent(selectedTab, repositories);


    return (
        <Container>
            <SettingsContainer><Link to="/settings">Settings</Link></SettingsContainer>
            <Tabs onClick={setSelectedTab} selectedTab={selectedTab} tabs={repositories.map(pr => ({
                owner: pr.repository.owner.login,
                repo: pr.repository.name
            }))}/>
            <Content pullRequests={content}/>
        </Container>
    )
};

export default Home;
