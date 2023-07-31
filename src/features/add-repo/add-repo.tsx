import { Button, createStyles, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useDebounce } from 'usehooks-ts';
import React, { useEffect, useState } from 'react';
import type IRepository from 'types/repositories.ts';
import { AddRepoForm, Container, Field } from './add-repo.styled.tsx';

const useStyles = createStyles({
  input: {
    width: 600,
  },
});

interface Props {
  submitRepo: (newRepo: IRepository) => void
}

const getOwnerAndRepo = (url: string): {owner: string; repo: string} => {
  const matches = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);

  if (matches == null) {
    throw new Error('Invalid GitHub URL');
  }

  const owner = matches[1];
  const repo = matches[2];

  return { owner, repo };
};

const AddRepo: React.FC<Props> = ({ submitRepo }: Props) => {
  const [newRepo, setNewRepo] = useInputState<string>('');
  const [
    {
      url,
      owner,
      repo,
    },
    setResult,
  ] = useState<{ url?: string; owner?: string; repo?: string }>({});
  const debounced = useDebounce(newRepo, 500);
  const { classes } = useStyles();

  useEffect(() => {
    if (debounced != null && debounced !== '') {
      try {
        const { owner: parsedOwner, repo: parsedRepo } = getOwnerAndRepo(debounced);
        setResult({
          owner: parsedOwner,
          repo: parsedRepo,
          url: debounced,
        });
      } catch (e) {
        setResult({});
        console.error('Wrong');
      }
    } else {
      setResult({});
    }
  }, [debounced]);

  const onSubmit = (): void => {
    submitRepo({ url, owner, repo } as IRepository);
    setNewRepo('');
  };

  return (
    <Container>
      <AddRepoForm>
        <TextInput className={classes.input} value={newRepo} onInput={setNewRepo} placeholder="New repo" />
        <Button onClick={onSubmit} disabled={repo == null || owner == null}>Add repo</Button>
      </AddRepoForm>
      <Field>
        {repo && (
        <>
          Repo:
          {repo}
        </>
        )}
      </Field>
      <Field>
        {owner && (
        <>
          Owner:
          {owner}
        </>
        )}
      </Field>
    </Container>
  );
};

export default AddRepo;
