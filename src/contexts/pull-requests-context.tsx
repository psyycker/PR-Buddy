import React, {createContext, useContext, useEffect, useState} from "react";
import {IRepositoryResponse} from "../typedefs/pull-request.ts";
import usePrs from "../hooks/use-prs.ts";

interface IPullRequestsContext {
    repositories: IRepositoryResponse[];
    updatePRs: (newRepo: boolean) => void;
    isLoading: boolean
}

const PullRequestsContext = createContext<IPullRequestsContext>({
    repositories: [],
    updatePRs: () => {},
    isLoading:false
});

type Props = {
    children: React.ReactNode
}

export const PullRequestsContextProvider = ({children}: Props) => {
    const {isLoading, repositories, updatePRs, refreshRepositories, repos} = usePrs()
    const [forceLoading, setForceLoading] = useState(false);

    const forceUpdate = async (newRepo = false) => {
        setForceLoading(true);
        if (newRepo) {
            await refreshRepositories();
        } else {
            await updatePRs();
            setForceLoading(false);
        }
    }

    useEffect(() => {
        updatePRs().then(() => {
            setForceLoading(false);
        })
    }, [repos]);


    return <PullRequestsContext.Provider value={{repositories, updatePRs: forceUpdate, isLoading: isLoading || forceLoading}}>
        {children}
    </PullRequestsContext.Provider>
}

export const useRepositoriesWithData = () => {
    const {repositories, isLoading} = useContext(PullRequestsContext);

    return {repositories, isLoading};
}

export const useUpdatePrs = () => {
    const {updatePRs} = useContext(PullRequestsContext)

    return updatePRs;
}
