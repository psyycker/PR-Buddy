import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const RepositoryContainer = styled.div`
  position: relative;
`;

export const DeleteCross = styled.div`
  color: red;
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bolder;
  
  &:hover {
    cursor: pointer;
  }
`;
