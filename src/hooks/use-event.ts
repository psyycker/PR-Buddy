import { emit, listen, type UnlistenFn } from '@tauri-apps/api/event';
import { useEffect } from 'react';

const useEvent = (key: string, callback?: () => void | Promise<void>): (payload?: any) => void => {
  const sendEvent = (payload?: any): void => {
    emit(key, payload).catch((err) => { console.error(err); });
  };

  useEffect(() => {
    let unlisten: Promise<void | UnlistenFn> | undefined;
    if (callback != null) {
      unlisten = listen(key, callback).catch((err) => {
        console.error(err);
      });
    }
    return () => {
      if (unlisten != null) {
        unlisten.then((fct) => { if (fct) fct(); }).catch((err) => { console.error(err); });
      }
    };
  }, [callback, key]);

  return sendEvent;
};

export default useEvent;
