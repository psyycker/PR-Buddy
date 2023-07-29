import { Container } from './github-token-settings-tab.styled.tsx';
import { useInputState } from '@mantine/hooks';
import { useConfig } from 'contexts/config-context.tsx';
import { useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';

const GithubTokenSettingsTab = () => {
  const { githubToken, setGithubToken } = useConfig();
  const [token, setToken] = useInputState<string>('');

  useEffect(() => {
    setToken(githubToken);
  }, [githubToken]);

  const confirmClick = () => {
    setGithubToken(token);
  };

  return (
    <Container>
      <h4>Github Token</h4>
      <TextInput type="password" value={token} onInput={setToken} placeholder="Github token" />
      <Button onClick={confirmClick}>Confirm</Button>
    </Container>
  );
};

export default GithubTokenSettingsTab;
