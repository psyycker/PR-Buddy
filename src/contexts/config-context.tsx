import { CONFIG_CHANGE_EVENT } from 'constants/events.ts';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAppConfig, saveAppConfig } from 'utils/fs-utils';
import useEvent from 'hooks/use-event.ts';

interface IConfigContext {
  githubToken: string;
  setGithubToken: (newToken: string) => void;
  isLoading: boolean;
}

const ConfigContext = createContext<IConfigContext>({
  githubToken: '',
  setGithubToken: () => {},
  isLoading: false,
});

interface Props {
  children: React.ReactNode
}

const ConfigContextProvider = ({ children }: Props) => {
  const [githubToken, setGithubToken] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sendEvent = useEvent(CONFIG_CHANGE_EVENT, async () => {
    const config = await getAppConfig();
    setGithubToken(config.githubToken);
    if (isLoading) {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    getAppConfig().then((config) => {
      setGithubToken(config.githubToken);
      setIsLoading(false);
    });
  }, []);

  const setToken = (newToken: string) => {
    getAppConfig().then(async (config) => {
      const newConfig = { ...config };
      newConfig.githubToken = newToken;
      await saveAppConfig(newConfig);
      sendEvent();
      setGithubToken(newToken);
    }).catch((err) => { console.error(err); });
  };

  return (
    <ConfigContext.Provider value={{
      githubToken,
      setGithubToken: setToken,
      isLoading,
    }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

export default ConfigContextProvider;
