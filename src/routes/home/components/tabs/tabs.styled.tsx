import styled, {css} from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: row;
  border-bottom: 1px solid white;
  position: fixed;
  margin-top: 50px;
  background-color: white;
`;

const selectedTabStyle = css`
  border-bottom: 2px solid #339bf0;
`;

export const Tab = styled.div<{selected: boolean}>`
  height: 25px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background-color: white;
  
  ${({selected}) => selected && selectedTabStyle}

  &:hover {
    cursor: pointer;
    background-color: rgb(248, 249, 250);
  }
`
