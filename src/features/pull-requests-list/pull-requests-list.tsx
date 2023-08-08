import React, { type FC, forwardRef, useMemo } from 'react';
import { type IPullRequest } from 'types/pull-request';
import * as dateFns from 'date-fns';
import PullRequest from './components/pull-request';
import { Container } from './pull-requests-list.styled';

interface Props {
    pullRequests: IPullRequest[];
}

const {
  isToday, isWithinInterval, isBefore, subDays,
} = dateFns;

const getEditionOrCreationDate = (pullRequest: IPullRequest): Date => {
  if (pullRequest.lastEditedAt) {
    return new Date(pullRequest.lastEditedAt);
  }
  return new Date(pullRequest.createdAt);
};

const isWithinLast7Days = (date: Date): boolean => {
  const sevenDaysAgo = subDays(new Date(), 7);
  return isWithinInterval(date, { start: sevenDaysAgo, end: new Date() });
};

const isOld = (date: Date): boolean => {
  const sevenDaysAgo = subDays(new Date(), 7);
  return isBefore(date, sevenDaysAgo);
};

interface IFormattedPRs {
  today: IPullRequest[],
  last7Days: IPullRequest[],
  olderThan7Days: IPullRequest[]
}

const mapPrList = (
  list: IPullRequest[],
  firstLabel: string,
): React.ReactNode[] => list.map((item, index) => (
  <PullRequest
    key={item.url}
    pullRequest={item}
    header={index === 0 ? firstLabel : undefined}
  />
));

const PullRequestsList = forwardRef<HTMLDivElement, Props>(({ pullRequests }, ref) => {
  const {
    today,
    last7Days,
    olderThan7Days,
  } = useMemo(() => pullRequests.reduce((
    acc: IFormattedPRs,
    pullRequest,
  ): IFormattedPRs => {
    const lastActiveDate = getEditionOrCreationDate(pullRequest);
    switch (true) {
      case isToday(lastActiveDate):
        return {
          ...acc,
          today: [
            ...acc.today,
            pullRequest,
          ],
        };
      case isWithinLast7Days(lastActiveDate):
        return {
          ...acc,
          last7Days: [
            ...acc.last7Days, pullRequest,
          ],
        };
      case isOld(lastActiveDate):
        return {
          ...acc,
          olderThan7Days: [
            ...acc.olderThan7Days,
            pullRequest,
          ],
        };
      default:
        return acc;
    }
  }, { today: [], last7Days: [], olderThan7Days: [] }), [pullRequests]);

  return (
    <Container>
      <div ref={ref} />
      {mapPrList(today, 'Today')}
      {mapPrList(last7Days, 'Last 7 Days')}
      {mapPrList(olderThan7Days, 'Older')}
    </Container>
  );
});

export default PullRequestsList;
