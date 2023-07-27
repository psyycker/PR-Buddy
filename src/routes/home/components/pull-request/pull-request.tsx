import {IPullRequest} from "../../../../typedefs/pull-request.ts";
import { open } from '@tauri-apps/api/shell';
import {
    Container,
    Title,
    LastModified,
    Author,
    Separator,
    UpSideContainer,
    SideBySideContainer, HalfWidthContainer, HalfContainerContent, HalfContainerTitle
} from "./pull-request.styled.tsx";
import {useMemo} from "react";
import * as dateFns from 'date-fns'

const {format} = dateFns;

type Props = {
    pullRequest: IPullRequest;
}
const PullRequest = ({pullRequest}: Props) => {

    const onClick = () => {
        open(pullRequest.url)
    }

    const mostRecentEditionDate = useMemo(() => {
        const date = new Date(pullRequest.lastEditedAt || pullRequest.createdAt);
        return format(date, 'dd-MM-yyyy hh:mm')
    },[pullRequest])

    const approvalsCount = useMemo(() => {
        return pullRequest.reviews.nodes.reduce((acc, review): number => {
            return acc + (review.state === 'APPROVED' ? 1 : 0)
        }, 0);
    }, [pullRequest])

    const commentsCount = useMemo(() => {
        console.log(pullRequest)
        return pullRequest.reviews.nodes.reduce((acc, review): number => {
            return acc + (review.state === 'COMMENTED' ? 1 : 0)
        }, 0);
    }, [pullRequest])

    return (
        <Container onClick={onClick}>
            <UpSideContainer>
                <Title>
                    {pullRequest.title}
                </Title>
                <Author> by {pullRequest.author.login}</Author>
                <LastModified>Last modified: {mostRecentEditionDate}</LastModified>
            </UpSideContainer>
            <Separator/>
            <SideBySideContainer>
                <HalfWidthContainer>
                    <HalfContainerTitle>Approvals</HalfContainerTitle>
                    <HalfContainerContent>{approvalsCount}</HalfContainerContent>
                </HalfWidthContainer>
                <HalfWidthContainer>
                    <HalfContainerTitle>Comments</HalfContainerTitle>
                    <HalfContainerContent>{commentsCount}</HalfContainerContent>
                </HalfWidthContainer>
            </SideBySideContainer>
        </Container>
    )
};

export default PullRequest;
