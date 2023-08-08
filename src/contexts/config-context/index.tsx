import React, {
  createContext,
  type FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAppConfig } from 'utils/fs-utils';
import useGithubTokenConfiguration from './hooks/use-github-token-configuration.ts';
import useGeneralConfiguration from './hooks/use-general-configuration';

interface IGeneralConfig {
  filterOlderThanDays: number;
  hideAfterApprovals: number;
}

interface IConfigContext {
  githubToken: string;
  setGithubToken: (newToken: string) => void;
  isLoading: boolean;
  generalConfig: IGeneralConfig,
  setGeneralConfig: (newConfig: IGeneralConfig) => void,
  updateSingleValue: <T>(key: string, newValue: T) => void
}

const ConfigContext = createContext<IConfigContext>({
  githubToken: '',
  setGithubToken: () => {},
  isLoading: false,
  generalConfig: {
    filterOlderThanDays: 14,
    hideAfterApprovals: 0,
  },
  setGeneralConfig: () => {},
  updateSingleValue: () => {},
});

interface Props {
  children: React.ReactNode
}

const ConfigContextProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    generalConfig,
    setConfig: setGeneralConfig,
    updateConfig: updateGeneralConfig,
    updateSingleValue,
  } = useGeneralConfiguration(isLoading, setIsLoading);

  const {
    updateConfig: updateGithubToken,
    setToken,
    githubToken,
  } = useGithubTokenConfiguration(isLoading, setIsLoading);

  useEffect(() => {
    getAppConfig().then((config) => {
      updateGithubToken(config);
      updateGeneralConfig(config);
      setIsLoading(false);
    });
  }, []);

  return (
    <ConfigContext.Provider value={{
      githubToken,
      setGithubToken: setToken,
      isLoading,
      generalConfig,
      setGeneralConfig,
      updateSingleValue,
    }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

export default ConfigContextProvider;
