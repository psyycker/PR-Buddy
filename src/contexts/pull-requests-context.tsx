import React, {createContext, useContext, useState} from "react";
import {IRepositoryResponse} from "../typedefs/pull-request.ts";
import usePrs from "../hooks/use-prs.ts";

interface IPullRequestsContext {
    repositories: IRepositoryResponse[];
    updatePRs: () => void;
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
    const {isLoading, repositories, updatePRs, refreshRepositories} = usePrs()
    const [forceLoading, setForceLoading] = useState(false);

    const forceUpdate = async () => {
        setForceLoading(true);
        await refreshRepositories();
        await updatePRs();
        setForceLoading(false);
    }


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
