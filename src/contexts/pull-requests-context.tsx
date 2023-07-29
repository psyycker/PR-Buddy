import React, {
  createContext,
  type FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { type IRepositoryResponse } from '../types/pull-request.ts';
import usePrs from '../hooks/use-prs.ts';

interface IPullRequestsContext {
    repositories: IRepositoryResponse[];
    updatePRs: () => Promise<void>;
    isLoading: boolean
}

const PullRequestsContext = createContext<IPullRequestsContext>({
  repositories: [],
  updatePRs: async () => {},
  isLoading: false,
});

interface Props {
    children: React.ReactNode
}

export const PullRequestsContextProvider: FC<Props> = ({ children }: Props) => {
  const {
    isLoading,
    repositories,
    updatePRs,
  } = usePrs();
  const [forceLoading, setForceLoading] = useState(false);

  const forceUpdate = useCallback(async (): Promise<void> => {
    setForceLoading(true);
    await updatePRs();
    setForceLoading(false);
  }, [updatePRs, setForceLoading]);

  const value = useMemo(() => ({
    repositories,
    updatePRs: forceUpdate,
    isLoading: isLoading || forceLoading,
  }), [repositories, forceUpdate, isLoading, forceLoading]);

  return (
    <PullRequestsContext.Provider value={value}>
      {children}
    </PullRequestsContext.Provider>
  );
};

export const useRepositoriesWithData = (): {
    isLoading: boolean,
    repositories: IRepositoryResponse[]
} => {
  const { repositories, isLoading } = useContext(PullRequestsContext);

  return { repositories, isLoading };
};

export const useUpdatePrs = (): () => Promise<void> => {
  const { updatePRs } = useContext(PullRequestsContext);

  return updatePRs;
};
