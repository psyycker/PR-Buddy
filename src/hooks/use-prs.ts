import useToken from "./use-token.ts";
import {useEffect, useState} from "react";
import useRepositories from "./use-repositories.ts";
import {gql, GraphQLClient} from "graphql-request";
import {IPullRequest, IRepositoryResponse} from "../typedefs/pull-request.ts";
import * as datefns from 'date-fns'
import {useInterval} from "usehooks-ts";
import {sendNotification} from "../utils/notifications.ts";

const graphqlAPIEndpoint = 'https://api.github.com/graphql';

const {isBefore} = datefns;


const getGraphQLClient = (token: string) => {
    return new GraphQLClient(graphqlAPIEndpoint, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
}

const isApproved = (reviews: {state: string}[]) => {
    //TODO: Add a setting to determine the approval of a repo
    return reviews.reduce((acc, review) => {
        return acc + (review.state === 'APPROVED' ? 1 : 0)
    }, 0) < 2
}

const isDraft = (pullRequest: IPullRequest) => {
    return pullRequest.isDraft
}

const countNewPRs = (repositoriesList: IRepositoryResponse[], lastCheckedDate: Date): number => {
    let count = 0;
    repositoriesList.forEach(repository => {
        repository.repository.pullRequests.nodes.forEach(pr => {
            const prDate = new Date(pr.createdAt)
            if (isBefore(lastCheckedDate, prDate)) {
                count += 1;
            }
        })
    })
    return count;
}

const usePrs = () => {
    const {token, isLoading: isTokenLoading} = useToken();
    const {repositories, isLoading: isReposLoading, refresh: refreshRepositories} = useRepositories();
    const [repositoryResponses, setRepositoryResponses] = useState<IRepositoryResponse[]>([])
    const [lastCheckDate, setLastCheckDate] = useState<undefined|Date>()

    const isLoading = isTokenLoading || isReposLoading

    const updatePRs = async () => {
        if (token == null) return;
        if (repositories == null) return;
        const graphQLClient = getGraphQLClient(token);
        let allData: IRepositoryResponse[] = []

        const query = gql`
            query GetOpenPRs($owner: String!, $repo: String!) {
                viewer {
                    login
                }
                repository(owner: $owner, name: $repo) {
                    owner {
                        login
                    }
                    name
                    url
                    pullRequests(states: OPEN, last: 100) {
                        nodes {
                            number
                            title
                            url
                            state
                            isDraft
                            lastEditedAt
                            createdAt
                            author {
                                login
                            }
                            reviews(first: 100) {
                                nodes {
                                    state,
                                    author {
                                        login
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        for (let repository of repositories) {
            const variables = {
                owner: repository.owner,
                repo: repository.repo
            };
            allData.push(await graphQLClient.request(query, variables))
        }

        for (let repository of allData) {
            repository.repository.pullRequests.nodes = repository
                .repository
                .pullRequests
                .nodes
                .filter(node => isApproved(node.reviews.nodes))
                .filter(node => !isDraft(node))
        }
        setRepositoryResponses(allData)
        if (lastCheckDate == null) {
            setLastCheckDate(new Date())
        } else {
            const newPRs = countNewPRs(allData, lastCheckDate);
            setLastCheckDate(new Date())
            if (newPRs === 1) {
                sendNotification(`There is ${newPRs} new PR to review`)
            } else if (newPRs > 1) {
                sendNotification(`There are ${newPRs} new PRs to review`)
            }
        }
    }

    useEffect(() => {
        if (token && !isLoading) updatePRs();
    }, [token, isLoading])

    useInterval(() => {
        updatePRs();
    }, 600000)


    return {
        isLoading,
        repositories: repositoryResponses,
        updatePRs,
        refreshRepositories
    }
}

export default usePrs;
