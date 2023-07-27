import IRepository, {Repositories as RepositoriesType} from "../../../../typedefs/repositories.ts";
import {Container, DeleteCross, RepositoryContainer} from "./repositories-list.styled.tsx";

type Props = {
    repositories: RepositoriesType;
    removeRepo: (repo: IRepository) => void
}
const RepositoriesList = ({repositories, removeRepo}: Props) => {
    return (
        <Container>
            {repositories.map(repo => (
                <RepositoryContainer key={repo.url}>
                    <div>URL: {repo.url}</div>
                    <div>Owner: {repo.owner}</div>
                    <div>Repo: {repo.repo}</div>
                    <DeleteCross onClick={() => removeRepo(repo)}>X</DeleteCross>
                </RepositoryContainer>
            ))}
        </Container>
    )
};

export default RepositoriesList;
