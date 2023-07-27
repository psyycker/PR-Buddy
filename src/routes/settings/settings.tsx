import {TextInput} from "@mantine/core";
import {useInputState} from "@mantine/hooks";
import {useEffect, useState} from "react";
import {getAppConfig, saveAppConfig} from "../../utils/fs-utils.ts";
import {useDebounce} from "usehooks-ts";
import {Link} from "react-router-dom";
import {Container} from "./settings.styled.tsx";
import AddRepo from "./components/add-repo";
import IRepository, {Repositories} from "../../typedefs/repositories.ts";
import RepositoriesList from "./components/repositories-list";

const Settings = () => {
    const [token, setToken] = useInputState<string>('');
    const [repositories, setRepositories] = useState<Repositories>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const debouncedToken = useDebounce(token, 500)

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
            saveAppConfig(data)
            setRepositories(data.repositories);
        })
    }

    const removeRepo = (repo: IRepository) => {
        getAppConfig().then(data => {
            data.repositories = data.repositories.filter(({url}) => url !== repo.url);
            saveAppConfig(data)
            setRepositories(data.repositories)
        })
    }

    if (isLoading) return null

    return (
        <Container>
            <Link to="/">Back</Link>
            Settings
            <TextInput value={token} onInput={setToken} placeholder="Github token"/>
            <AddRepo submitRepo={addRepo}/>
            <h4>Repositories</h4>
            <RepositoriesList removeRepo={removeRepo} repositories={repositories}/>
        </Container>
    )
};

export default Settings;
