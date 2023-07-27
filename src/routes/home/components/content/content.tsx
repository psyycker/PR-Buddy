import {IPullRequest} from "../../../../typedefs/pull-request.ts";
import {Container} from "./content.styled.tsx";
import PullRequest from "../pull-request";

type Props = {
    pullRequests: IPullRequest[];
}
const Content = ({pullRequests}: Props) => {
    return <Container>
        {pullRequests.map(pullRequest => <PullRequest key={pullRequest.number + pullRequest.title} pullRequest={pullRequest}/>)}
    </Container>
};

export default Content;
