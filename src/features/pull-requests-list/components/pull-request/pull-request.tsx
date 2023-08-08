import {
  Accordion,
  createStyles,
} from '@mantine/core';
import { type IPullRequest } from 'types/pull-request';
import { type FC } from 'react';
import TimelineHeader from 'features/pull-requests-list/components/timeline-header';
import {
  AccordionWrapper,
  Container,
} from './pull-request.styled.tsx';
import TopSide from '../top-side';
import BottomSide from '../bottom-side';

interface Props {
    pullRequest: IPullRequest;
    header: string | undefined;
}

const useStyle = createStyles({
  accordion: {
    border: '0.0625rem solid #dee2e6',
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1);',
  },
  externalLink: {
    position: 'absolute',
    top: 5,
    right: 14,
  },
  accordionContent: {
    borderTop: '0.0625rem solid #dee2e6',
  },
});

const PullRequest: FC<Props> = ({ pullRequest, header = undefined }: Props) => {
  const { classes } = useStyle();
  return (
    <Container>
      {header && <TimelineHeader header={header} />}
      <AccordionWrapper>
        <Accordion chevronPosition="right">
          <Accordion.Item className={classes.accordion} value={pullRequest.url}>
            <Accordion.Control>
              <TopSide pullRequest={pullRequest} />
            </Accordion.Control>
            <Accordion.Panel className={classes.accordionContent}>
              <BottomSide pullRequest={pullRequest} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </AccordionWrapper>
    </Container>
  );
};

export default PullRequest;
