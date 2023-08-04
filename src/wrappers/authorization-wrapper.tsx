import React, { type FC, useEffect, useState } from 'react';
import { init } from 'utils/fs-utils';

interface Props {
  children: React.ReactNode
}

const AuthorizationWrapper: FC<Props> = ({ children }: Props) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    init().then(() => {
      setReady(true);
    }).catch((err) => { setError(err); });
  }, [mounted]);

  if (error) return <div>{error}</div>;

  if (!ready) return null;

  return children;
};

export default AuthorizationWrapper;
