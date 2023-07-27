import {Link} from "react-router-dom";
import usePrs from "../../hooks/use-prs.ts";
import {Container, SettingsContainer} from "./home.styled.tsx";
import Tabs from "./components/tabs";
import {useEffect, useRef, useState} from "react";
import useTabContent from "../../hooks/use-tab-content.ts";
import Content from "./components/content";
import { sendNotification } from '@tauri-apps/api/notification';

const Home = () => {
    const sentStartupNotification = useRef(false)
    const [selectedTab, setSelectedTab] = useState<'All' | {owner: string; repo: string}>('All')
    const {isLoading, pullRequests} = usePrs()
    const {content, isLoading: contentLoading} = useTabContent(selectedTab, pullRequests);

    useEffect(() => {
        if (isLoading) return;
        if (contentLoading) return;
        if (content.length === 0) return;
        if (sentStartupNotification.current) return;
        sentStartupNotification.current = true;
        sendNotification(`There are ${content.length} Pull Requests needing review`);

    }, [content, isLoading, contentLoading]);



    if (isLoading) return <div>Loading...</div>
    return (
        <Container>
            <SettingsContainer><Link to="/settings">Settings</Link></SettingsContainer>
            <Tabs onClick={setSelectedTab} selectedTab={selectedTab} tabs={pullRequests.map(pr => ({
                owner: pr.repository.owner.login,
                repo: pr.repository.name
            }))}/>
            <Content pullRequests={content}/>
        </Container>
    )
};

export default Home;
