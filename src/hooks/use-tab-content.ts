import {IPullRequest, IRepositoryResponse} from "../typedefs/pull-request.ts";
import {useEffect, useState} from "react";

const useTabContent = (selectedTab: 'All' | string, repositories: IRepositoryResponse[]) => {
    const [content, setContent] = useState<IPullRequest[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (selectedTab === 'All') {
            const merged = repositories.reduce((acc: IPullRequest[], repository) => {
                return [...acc, ...repository.repository.pullRequests.nodes]
            }, [])
            setContent(merged)
        } else {
            const found = repositories.find(repo => repo.repository.url === selectedTab)
            if (found != null) {
                setContent(found.repository.pullRequests.nodes)
            }
        }
        setIsLoading(false)
    }, [selectedTab, repositories])

    return {content, isLoading}
}

export default useTabContent
