import {IPullRequest} from "../../../../types/pull-request.ts";
import {LoadingOverlay} from "@mantine/core";
import {Container} from "./content.styled.tsx";
import PullRequest from "../pull-request";

type Props = {
    pullRequests: IPullRequest[];
    isLoading: boolean
}
const Content = ({pullRequests, isLoading}: Props) => {
    return (
        <Container>
            <LoadingOverlay visible={isLoading} overlayBlur={2}/>
        {pullRequests.map(pullRequest => <PullRequest key={pullRequest.number + pullRequest.title} pullRequest={pullRequest}/>)}
    </Container>
    )
};

export default Content;
