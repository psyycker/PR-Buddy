import { REPOSITORIES_CHANGE_EVENT } from 'constants/events.ts';
import { type Repositories } from 'types/repositories';
import type IRepository from 'types/repositories';
import React, {
  createContext,
  type FC, useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAppConfig, saveAppConfig } from 'utils/fs-utils';
import useEvent from 'hooks/use-event';

interface IRepositoriesActions {
  addRepo: (repo: IRepository) => void;
  removeRepo: (url: string) => void;
  toggleRepoStatus: (url: string) => void;
}

interface IRepositoriesData {
  repositories: Repositories;
  enabledRepositories: Repositories;
  isLoading: boolean
}

interface IRepositoriesContext extends IRepositoriesActions, IRepositoriesData {}

const RepositoriesContext = createContext<IRepositoriesContext>({
  repositories: [],
  enabledRepositories: [],
  addRepo: () => {},
  removeRepo: () => {},
  toggleRepoStatus: () => {},
  isLoading: false,
});

interface IProps {
  children: React.ReactNode
}

export const RepositoriesContextProvider: FC<IProps> = ({ children }: IProps) => {
  const [repositories, setRepositories] = useState<Repositories>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sendEvent = useEvent(REPOSITORIES_CHANGE_EVENT, async () => {
    const config = await getAppConfig();
    if (config.repositories) {
      setRepositories(config.repositories);
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    getAppConfig().then((config) => {
      if (config.repositories) {
        setRepositories(config.repositories);
      }
      setIsLoading(false);
    }).catch((err) => { console.error(err); });
  }, []);

  const addRepo = (repo: IRepository): void => {
    getAppConfig().then(async (data) => {
      const newData = { ...data };
      if (newData.repositories == null) {
        newData.repositories = [];
      }
      newData.repositories = [...newData.repositories, { ...repo, enabled: true }];
      await saveAppConfig(newData);
      sendEvent();
      setRepositories(newData.repositories);
    }).catch((err) => { console.error(err); });
  };

  const removeRepo = (url: string): void => {
    getAppConfig().then(async (data) => {
      const newData = { ...data };
      newData.repositories = data.repositories.filter((repo) => url !== repo.url);
      await saveAppConfig(newData);
      sendEvent();
      setRepositories(newData.repositories);
    }).catch((err) => { console.error(err); });
  };

  const toggleRepoStatus = (url: string): void => {
    getAppConfig().then(async (data) => {
      const newData = { ...data };
      newData.repositories = data.repositories.map((repository) => {
        if (repository.url === url) {
          return {
            ...repository,
            enabled: !repository.enabled,
          };
        }
        return repository;
      });
      await saveAppConfig(newData);
      sendEvent();
      setRepositories(newData.repositories);
    }).catch((err) => { console.error(err); });
  };

  const enabledRepositories = useMemo(
    () => repositories.filter((repo) => repo.enabled),
    [repositories],
  );

  const value: IRepositoriesContext = useMemo(() => ({
    repositories,
    enabledRepositories,
    isLoading,
    addRepo,
    removeRepo,
    toggleRepoStatus,
  }), [repositories, isLoading, addRepo, removeRepo, toggleRepoStatus]);

  return (
    <RepositoriesContext.Provider value={value}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = (): IRepositoriesData => {
  const { repositories, enabledRepositories, isLoading } = useContext(RepositoriesContext);

  return {
    repositories,
    isLoading,
    enabledRepositories,
  };
};

export const useRepositoriesActions = (): IRepositoriesActions => {
  const { toggleRepoStatus, addRepo, removeRepo } = useContext(RepositoriesContext);

  return {
    toggleRepoStatus,
    addRepo,
    removeRepo,
  };
};
