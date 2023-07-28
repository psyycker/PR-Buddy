import {TextInput} from "@mantine/core";
import {useInputState} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {getAppConfig, saveAppConfig} from "../../utils/fs-utils.ts";
import {useDebounce} from "usehooks-ts";
import {Container, Content} from "./settings.styled.tsx";
import AddRepo from "./components/add-repo";
import IRepository, {Repositories} from "../../typedefs/repositories.ts";
import RepositoriesList from "./components/repositories-list";
import {useUpdatePrs} from "../../contexts/pull-requests-context.tsx";
import Header from "../../components/header";

const Settings = () => {
    const [token, setToken] = useInputState<string>('');
    const [repositories, setRepositories] = useState<Repositories>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const debouncedToken = useDebounce(token, 500)
    const updatePRs = useUpdatePrs();

    useEffect(() => {
        getAppConfig().then(config => {
            setToken(config.githubToken)
            if (config.repositories) {
                setRepositories(config.repositories);
            }
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if (isLoading) return;
        getAppConfig().then(config => {
            config.githubToken = token
            saveAppConfig(config)
        })
    }, [debouncedToken]);

    const addRepo = (repo: IRepository) => {
        getAppConfig().then(data => {
            if (data.repositories == null) {
                data.repositories = []
            }
            data.repositories = [...data.repositories, repo];
            saveAppConfig(data).then(() => {
                updatePRs()
            })
            setRepositories(data.repositories);
        })
    }

    const removeRepo = (repo: IRepository) => {
        getAppConfig().then(data => {
            data.repositories = data.repositories.filter(({url}) => url !== repo.url);
            saveAppConfig(data).then(() => {
                updatePRs()
            })
            setRepositories(data.repositories)
        })
    }

    if (isLoading) return null

    return (
        <Container>
            <Header actionButtonLabel="Confirm" actionButtonDest="/"/>
            <Content>
                <span>Github Token</span>
                <TextInput value={token} onInput={setToken} placeholder="Github token"/>
                <AddRepo submitRepo={addRepo}/>
                <h4>Repositories</h4>
                <RepositoriesList removeRepo={removeRepo} repositories={repositories}/>
            </Content>
        </Container>
    )
};

export default Settings;