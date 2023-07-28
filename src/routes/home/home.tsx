import {Container} from "./home.styled.tsx";
import Tabs from "./components/tabs";
import {useState} from "react";
import useTabContent from "../../hooks/use-tab-content.ts";
import Content from "./components/content";
import {useRepositoriesWithData} from "../../contexts/pull-requests-context.tsx";
import Header from "../../components/header";

const Home = () => {
    const [selectedTab, setSelectedTab] = useState<'All' | string>('All')
    const {repositories, isLoading} = useRepositoriesWithData()
    const {content} = useTabContent(selectedTab, repositories);


    return (
        <Container>
            <Header actionButtonLabel="Settings" actionButtonDest="/settings" allowRefresh/>
            <Tabs onClick={setSelectedTab} selectedTab={selectedTab} tabs={repositories.map(pr => ({
                url: pr.repository.url,
                owner: pr.repository.owner.login,
                repo: pr.repository.name
            }))}/>
            <Content isLoading={isLoading} pullRequests={content}/>
        </Container>
    )
};

export default Home;
