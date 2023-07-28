import {IPullRequest, IRepositoryResponse} from "../typedefs/pull-request.ts";
import {useEffect, useState} from "react";
import * as datefns from "date-fns";

const {isBefore} = datefns;

const sort = (a: IPullRequest, b: IPullRequest): number => {
    const mostRecentEditionA = new Date(a.lastEditedAt || a.createdAt)
    const mostREcentEditionB = new Date(b.lastEditedAt || b.createdAt)

    return isBefore(mostRecentEditionA, mostREcentEditionB) ? 1 : -1
}

const useTabContent = (selectedTab: 'All' | string, repositories: IRepositoryResponse[]) => {
    const [content, setContent] = useState<IPullRequest[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (selectedTab === 'All') {
            const merged = repositories.reduce((acc: IPullRequest[], repository) => {
                return [...acc, ...repository.repository.pullRequests.nodes]
            }, [])
            setContent(merged.sort(sort))
        } else {
            const found = repositories.find(repo => repo.repository.url === selectedTab)
            if (found != null) {
                setContent(found.repository.pullRequests.nodes.sort(sort))
            }
        }
        setIsLoading(false)
    }, [selectedTab, repositories])

    return {content, isLoading}
}

export default useTabContent
