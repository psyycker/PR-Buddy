import { useEffect, useState } from 'react';
import { getAppConfig } from 'utils/fs-utils';

const useToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<undefined|string>();

  useEffect(() => {
    getAppConfig().then((data) => {
      setToken(data.githubToken);
      setIsLoading(false);
    });
  }, []);

  return { token, isLoading };
};

export default useToken;
