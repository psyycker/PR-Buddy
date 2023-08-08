import { type FC } from 'react';
import { Header } from './timeline-header.styled';

interface IProps {
  header: string;
}

const TimelineHeader: FC<IProps> = ({ header }) => <Header>{header}</Header>;

export default TimelineHeader;
