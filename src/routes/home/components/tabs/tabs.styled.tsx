import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: row;
  border-bottom: 1px solid white;
  position: fixed;
  margin-top: 20px;
  background-color: #2f2f2f;
`;

export const Tab = styled.div<{selected: boolean}>`
  height: 25px;
  padding: 10px;
  border-left: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  
  background-color: ${({selected}) => selected && '#3f3f3f'};

  &:last-child {
    border-right: 1px solid grey;
  }

  &:hover {
    background-color: #3f3f3f;
    cursor: pointer;
  }
`
