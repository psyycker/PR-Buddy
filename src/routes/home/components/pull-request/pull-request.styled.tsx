import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 10px;
  &:hover {
    background-color: #3f3f3f;
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
  color: #e8e8e8;
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

export const Approvals = styled.span``;

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
