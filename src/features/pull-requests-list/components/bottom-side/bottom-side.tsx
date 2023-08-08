import { type IPullRequest } from 'types/pull-request';
import { Timeline, Text } from '@mantine/core';
import { IconThumbUpFilled, IconHourglassHigh } from '@tabler/icons-react';
import React, { type FC, useMemo } from 'react';
import {
  ApprovalsHistoryTitle,
  Container,
  LeftSide,
} from './bottom-side.styled';

interface Props {
  pullRequest: IPullRequest;
}

const BottomSide: FC<Props> = ({ pullRequest }) => {
  const formattedApprovals = useMemo(() => pullRequest.reviews.nodes.reduce(
    (acc: React.ReactNode[], node): React.ReactNode[] => {
      if (node.state === 'APPROVED') {
        return [...acc, (
          <Timeline.Item key={node.author.login + node.state + node.lastEditedAt + node.createdAt} bullet={<IconThumbUpFilled size={12} />} title="Approval">
            <Text size={12}>{node.author.login}</Text>
          </Timeline.Item>
        )];
      }
      return acc;
    },
    [],
  ), [pullRequest]);

  return (
    <Container>
      <LeftSide>
        <ApprovalsHistoryTitle>Approvals history</ApprovalsHistoryTitle>
        <Timeline
          styles={{
            item: {
              paddingTop: formattedApprovals.length > 0 ? 0 : 3,
            },
          }}
          active={formattedApprovals.length}
          bulletSize={24}
          lineWidth={2}
        >
          {formattedApprovals.length > 0 && formattedApprovals}
          {formattedApprovals.length === 0 && (
          <Timeline.Item
            bullet={<IconHourglassHigh size={12} />}
            title="No approval yet"
          />
          )}
        </Timeline>
      </LeftSide>
    </Container>

  );
};

export default BottomSide;
