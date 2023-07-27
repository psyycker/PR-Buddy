import {Button, createStyles, TextInput} from "@mantine/core";
import {useInputState} from "@mantine/hooks";
import {AddRepoForm, Container} from "./add-repo.styled.tsx";
import {useDebounce} from "usehooks-ts";
import {useEffect, useState} from "react";
import IRepository from "../../../../typedefs/repositories.ts";

const useStyles = createStyles({
    input: {
        width: 600
    },
});

type Props = {
    submitRepo: (newRepo: IRepository) => void
}

const getOwnerAndRepo = (url: string) => {
    const matches = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);

    if (!matches) {
        throw new Error('Invalid GitHub URL');
    }

    const owner = matches[1];
    const repo = matches[2];

    return {owner, repo};
};

const AddRepo = ({submitRepo}: Props) => {
    const [newRepo, setNewRepo] = useInputState<string>('');
    const [{url, owner, repo}, setResult] = useState<{ url?: string; owner?: string; repo?: string }>({});
    const debounced = useDebounce(newRepo, 500)
    const {classes} = useStyles();

    useEffect(() => {
        if (debounced != null && debounced !== '') {
            try {
                const {owner, repo} = getOwnerAndRepo(debounced);
                setResult({
                    owner,
                    repo,
                    url: debounced
                })
            } catch (e) {
                setResult({})
                console.error("Wrong")
            }
        } else {
            setResult({})
        }
    }, [debounced]);

    const onSubmit = () => {
        submitRepo({url, owner, repo} as IRepository);
        setNewRepo('')
    }

    return (
        <Container>
            <h4>Create a new Repository</h4>
            <AddRepoForm>
                <TextInput className={classes.input} value={newRepo} onInput={setNewRepo} placeholder="New repo"/>
                <Button onClick={onSubmit} disabled={repo == null || owner == null}>Add repo</Button>
            </AddRepoForm>
            {repo && owner && (
                <>
                    <div>repo: {repo}</div>
                    <div>owner: {owner}</div>
                </>
            )}
        </Container>
    )
};

export default AddRepo;
