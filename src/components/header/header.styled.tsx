import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  color: #339bf0;
  background-color: #0f0f0f;
  z-index: 3;
`;

export const SubContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  align-items: center;
`;

export const Title = styled.h1`
  position: absolute;
  left: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
