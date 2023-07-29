import Header from 'components/header';
import { type FC } from 'react';
import { Container, EmptyContentContainer } from './empty-content.styled.tsx';

const EmptyContent: FC = () => (
  <Container>
    <Header canRefresh={false} />
    <EmptyContentContainer>
      There is no repositories set currently
      <br />
      Go to the settings to start adding repositories
    </EmptyContentContainer>
  </Container>
);

export default EmptyContent;
