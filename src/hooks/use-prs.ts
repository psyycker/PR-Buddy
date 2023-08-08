import { PULL_REQUESTS_QUERY } from 'constants/graphql';
import { useCallback, useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import * as datefns from 'date-fns';
import { useInterval } from 'usehooks-ts';
import { useConfig } from 'contexts/config-context';
import { sendNotification } from 'utils/notifications';
import { type IPullRequest, type IRepositoryResponse, type IReview } from 'types/pull-request';
import { useRepositories } from 'contexts/repositories-context';

const graphqlAPIEndpoint = 'https://api.github.com/graphql';

const { isBefore, subDays } = datefns;

const getGraphQLClient = (token: string) => new GraphQLClient(graphqlAPIEndpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const isApproved = (reviews: IReview[], threshold: number) => {
  if (threshold === 0) return false;
  const approvedPrs = reviews.filter((review) => review.state === 'APPROVED');
  return approvedPrs.length >= threshold;
};

const isTooOld = (days: number, pullRequest: IPullRequest) => {
  if (days === 0) return true;
  const prDate = new Date(pullRequest.lastEditedAt || pullRequest.createdAt);
  const maxDate = subDays(new Date(), days);
  return !isBefore(prDate, maxDate);
};

const isDraft = (pullRequest: IPullRequest) => pullRequest.isDraft;

const countNewPRs = (repositoriesList: IRepositoryResponse[], lastCheckedDate: Date): number => {
  let count = 0;
  repositoriesList.forEach((repository) => {
    repository.repository.pullRequests.nodes.forEach((pr) => {
      const prDate = new Date(pr.createdAt);
      if (isBefore(lastCheckedDate, prDate)) {
        count += 1;
      }
    });
  });
  return count;
};

const usePrs = () => {
  const { githubToken: token, isLoading: isTokenLoading, generalConfig } = useConfig();
  const { enabledRepositories: repositories, isLoading: isRepositoriesLoading } = useRepositories();
  const [isPrLoading, setIsPrLoading] = useState(false);
  const [repositoryResponses, setRepositoryResponses] = useState<IRepositoryResponse[]>([]);
  const [lastCheckDate, setLastCheckDate] = useState<undefined|Date>();

  const isLoading = isTokenLoading || isRepositoriesLoading;

  const updatePRs = useCallback(async (): Promise<void> => {
    if (token == null) return;
    if (repositories == null) return;
    setIsPrLoading(true);
    const graphQLClient = getGraphQLClient(token);
    const allData: IRepositoryResponse[] = [];

    for (const repository of repositories) {
      const variables = {
        owner: repository.owner,
        repo: repository.repo,
      };
      allData.push(await graphQLClient.request(PULL_REQUESTS_QUERY, variables));
    }

    for (const repository of allData) {
      repository.repository.pullRequests.nodes = repository
        .repository
        .pullRequests
        .nodes
        .filter((node: IPullRequest) => isTooOld(generalConfig.filterOlderThanDays, node))
        .filter((node: IPullRequest) => !isApproved(
          node.reviews.nodes,
          generalConfig.hideAfterApprovals,
        ))
        .filter((node: IPullRequest) => !isDraft(node));
    }
    setRepositoryResponses(allData);
    if (lastCheckDate == null) {
      setLastCheckDate(new Date());
    } else {
      const newPRs = countNewPRs(allData, lastCheckDate);
      setLastCheckDate(new Date());
      if (newPRs === 1) {
        sendNotification(`There is ${newPRs} new PR to review`);
      } else if (newPRs > 1) {
        sendNotification(`There are ${newPRs} new PRs to review`);
      }
    }
    setIsPrLoading(false);
  }, [token, repositories, generalConfig]);

  useEffect(() => {
    if (token && !isLoading) updatePRs();
  }, [updatePRs, isLoading]);

  useInterval(() => {
    updatePRs();
  }, 600000);

  return {
    isLoading: isLoading || isPrLoading,
    repositories: repositoryResponses,
    updatePRs,
  };
};

export default usePrs;
