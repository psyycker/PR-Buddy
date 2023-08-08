import { TOKEN_CHANGE_EVENT } from 'constants/events';
import { useState } from 'react';
import type IAppConfig from 'types/app-config';
import { getAppConfig, saveAppConfig } from 'utils/fs-utils';
import useEvent from 'hooks/use-event';

const useGithubTokenConfiguration = (isLoading: boolean, setIsLoading: (newValue: boolean) => void) => {
  const [githubToken, setGithubToken] = useState('');

  const updateConfig = (newConfig: IAppConfig) => {
    setGithubToken(newConfig.githubToken);
  };

  const sendEvent = useEvent(TOKEN_CHANGE_EVENT, async () => {
    const config = await getAppConfig();
    updateConfig(config);
    if (isLoading) {
      setIsLoading(false);
    }
  });

  const setToken = (newToken: string) => {
    getAppConfig().then(async (config) => {
      const newConfig = { ...config };
      newConfig.githubToken = newToken;
      await saveAppConfig(newConfig);
      sendEvent();
      setGithubToken(newToken);
    }).catch((err) => { console.error(err); });
  };

  return {
    githubToken,
    setToken,
    updateConfig,
  };
};

export default useGithubTokenConfiguration;
