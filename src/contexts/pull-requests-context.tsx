import React, {createContext, useContext} from "react";
import {IRepositoryResponse} from "../typedefs/pull-request.ts";
import usePrs from "../hooks/use-prs.ts";

interface IPullRequestsContext {
    repositories: IRepositoryResponse[];
    updatePRs: () => void
}

const PullRequestsContext = createContext<IPullRequestsContext>({
    repositories: [],
    updatePRs: () => {}
});

type Props = {
    children: React.ReactNode
}

export const PullRequestsContextProvider = ({children}: Props) => {
    const {isLoading, repositories, updatePRs, refreshRepositories} = usePrs()

    const forceUpdate = async () => {
        await refreshRepositories();
        updatePRs();
    }

    if (isLoading) return <div>Loading...</div>;

    return <PullRequestsContext.Provider value={{repositories, updatePRs: forceUpdate}}>
        {children}
    </PullRequestsContext.Provider>
}

export const useRepositoriesWithData = () => {
    const {repositories} = useContext(PullRequestsContext);

    return repositories;
}

export const useUpdatePrs = () => {
    const {updatePRs} = useContext(PullRequestsContext)

    return updatePRs;
}
