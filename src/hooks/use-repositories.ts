import {useEffect, useState} from "react";
import {getAppConfig} from "../utils/fs-utils.ts";
import {Repositories} from "../typedefs/repositories.ts";

const useRepositories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [repositories, setRepositories] = useState<[]|Repositories>([]);

    const refresh = () => {
        return getAppConfig().then(data => {
            setRepositories(data.repositories)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        refresh()
    }, [])

    return {repositories, isLoading, refresh}
}

export default useRepositories
