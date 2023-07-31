import { open } from '@tauri-apps/api/shell';
import { useMemo } from 'react';
import * as dateFns from 'date-fns';
import { type IPullRequest } from 'types/pull-request';
import {
  Container,
  Title,
  LastModified,
  Author,
  Separator,
  UpSideContainer,
  SideBySideContainer,
  HalfWidthContainer,
  HalfContainerContent,
  HalfContainerTitle,
} from './pull-request.styled';

const { format } = dateFns;

interface Props {
    pullRequest: IPullRequest;
}

const DATE_FORMAT = 'dd-MM-yyyy hh:mm';
const PullRequest = ({ pullRequest }: Props) => {
  const onClick = () => {
    open(pullRequest.url);
  };

  const editionOrCreationDate = useMemo(() => {
    if (pullRequest.lastEditedAt) {
      return {
        creation: false,
        date: format(new Date(pullRequest.lastEditedAt), DATE_FORMAT),
      };
    }
    return {
      creation: true,
      date: format(new Date(pullRequest.createdAt), DATE_FORMAT),
    };
  }, [pullRequest]);

  const approvalsCount = useMemo(() => pullRequest.reviews.nodes.reduce((acc, review): number => acc + (review.state === 'APPROVED' ? 1 : 0), 0), [pullRequest]);

  const commentsCount = useMemo(() => pullRequest.reviews.nodes.reduce((acc, review): number => acc + (review.state === 'COMMENTED' ? 1 : 0), 0), [pullRequest]);

  return (
    <Container onClick={onClick}>
      <UpSideContainer>
        <Title>
          {pullRequest.title}
        </Title>
        <Author>
          {' '}
          by
          {pullRequest.author.login}
        </Author>
        <LastModified>
          {editionOrCreationDate.creation ? 'Created on' : 'Last edited on'}
          :
          {' '}
          {editionOrCreationDate.date}
        </LastModified>
      </UpSideContainer>
      <Separator />
      <SideBySideContainer>
        <HalfWidthContainer>
          <HalfContainerTitle>Approvals</HalfContainerTitle>
          <HalfContainerContent>{approvalsCount}</HalfContainerContent>
        </HalfWidthContainer>
        <HalfWidthContainer>
          <HalfContainerTitle>Comments</HalfContainerTitle>
          <HalfContainerContent>{commentsCount}</HalfContainerContent>
        </HalfWidthContainer>
      </SideBySideContainer>
    </Container>
  );
};

export default PullRequest;
