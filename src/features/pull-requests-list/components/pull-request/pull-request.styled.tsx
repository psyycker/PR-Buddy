import styled from 'styled-components';

export const AccordionWrapper = styled.div`
  display: flex;
  width: 95%;
  margin: 15px auto 0 auto;
  flex-direction: column;
  background-color: white;
  border-radius: 6px;
  position: relative;

  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
