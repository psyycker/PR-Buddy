import styled from 'styled-components';

export const UpSideContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10px;
  flex-direction: row;
  overflow: hidden;
`;

export const Title = styled.span`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`;

export const LastModified = styled.span`
  font-size: 12px;
  color: black;
  padding-left: 2px;
`;

export const Comments = styled.span``;

export const Author = styled.span`
  font-weight: 400;
  padding-left: 2px;
`;

export const MainViewLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;

export const MainViewRightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 5px;
`;

export const BadgeContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;
