import { ActionIcon, Badge, createStyles } from '@mantine/core';
import { IconExternalLink, IconMessage, IconThumbUpFilled } from '@tabler/icons-react';
import { type IPullRequest } from 'types/pull-request';
import React, {
  type FC, useMemo,
} from 'react';
import { open } from '@tauri-apps/api/shell';
import * as dateFns from 'date-fns';
import {
  Author,
  BadgeContent,
  LastModified,
  MainViewLeftSide,
  MainViewRightSide,
  Title,
  UpSideContainer,
} from './top-side.styled';

const { format } = dateFns;

const useStyle = createStyles({
  externalLink: {
    position: 'absolute',
    top: 5,
    right: 14,
  },
});

interface Props {
  pullRequest: IPullRequest;
}

const DATE_FORMAT = 'dd-MM-yyyy hh:mm';

const TopSide: FC<Props> = ({ pullRequest }) => {
  const { classes } = useStyle();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
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
    <UpSideContainer>
      <ActionIcon className={classes.externalLink} onClick={onClick}>
        <IconExternalLink type="div" size={20} />
      </ActionIcon>
      <MainViewLeftSide>
        <Title>
          {pullRequest.title}
        </Title>
        <LastModified>
          {editionOrCreationDate.creation ? 'Created on' : 'Last edited on'}
          :
          {' '}
          {editionOrCreationDate.date}
        </LastModified>
        <Author>
          by:
          {' '}
          {pullRequest.author.login}
        </Author>
      </MainViewLeftSide>
      <MainViewRightSide>
        <Badge>
          <BadgeContent>
            {approvalsCount}
            {' '}
            <IconThumbUpFilled size={15} />
          </BadgeContent>
        </Badge>
        <Badge>
          <BadgeContent>
            {commentsCount}
            {' '}
            <IconMessage size={15} />
          </BadgeContent>
        </Badge>
      </MainViewRightSide>
    </UpSideContainer>
  );
};

export default TopSide;
