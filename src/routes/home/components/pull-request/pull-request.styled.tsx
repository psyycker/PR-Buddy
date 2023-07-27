import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 95%;
  margin: 15px auto 0 auto;
  flex-direction: column;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgb(231, 244, 254);
    cursor: pointer;
  }
`;

export const UpSideContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10px;
  flex-direction: column;
`;

export const Title = styled.span`
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: -5px;
`;

export const LastModified = styled.span`
  font-size: 12px;
  color: black;
`;

export const SideBySideContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const HalfWidthContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  &:last-child {
    border-left: 1px solid #939393;
  }
`;

export const HalfContainerContent = styled.span`
  margin-bottom: 10px;
`;

export const HalfContainerTitle = styled.h4`
  color: #339bf0;
  font-weight: bold;
  margin: 10px 0;
`;

export const Comments = styled.span``;

export const Author = styled.span`
  font-weight: 400;
`;

export const Separator = styled.div`
  width: 95%;
  margin: auto;
  height: 1px;
  background-color: #939393;
`;
