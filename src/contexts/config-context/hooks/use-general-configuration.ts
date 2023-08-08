import { GENERAL_CONFIG_CHANGE_EVENT } from 'constants/events.ts';
import { useState } from 'react';
import type IAppConfig from 'types/app-config';
import type { IGeneralConfig } from 'types/app-config';
import useEvent from 'hooks/use-event';
import { getAppConfig, saveAppConfig } from 'utils/fs-utils';

export const initialState: IGeneralConfig = {
  filterOlderThanDays: 14,
  hideAfterApprovals: 2,
};

const useGeneralConfiguration = (isLoading: boolean, setIsLoading: (newValue: boolean) => void) => {
  const [generalConfig, setGeneralConfig] = useState<IGeneralConfig>(initialState);

  const updateConfig = (newConfig: IAppConfig): void => {
    if (newConfig.general == null) return;
    setGeneralConfig(newConfig.general);
  };

  const sendEvent = useEvent(GENERAL_CONFIG_CHANGE_EVENT, async () => {
    const config = await getAppConfig();
    updateConfig(config);
    if (isLoading) {
      setIsLoading(false);
    }
  });

  const setConfig = (newGeneralConfig: IGeneralConfig) => {
    getAppConfig().then(async (data) => {
      const newConfig = { ...data };
      newConfig.general = newGeneralConfig;
      await saveAppConfig(newConfig);
      sendEvent();
      setGeneralConfig(newGeneralConfig);
    });
  };

  const updateSingleValue = <T>(key: string, newValue: T): void => {
    let newConfig: IGeneralConfig;
    setGeneralConfig((current) => {
      const updated = ({
        ...current,
        [key]: newValue,
      });
      newConfig = updated;
      return updated;
    });
    getAppConfig().then(async (data) => {
      const wholeConfig = { ...data };
      wholeConfig.general = newConfig;
      await saveAppConfig(wholeConfig);
      sendEvent();
    });
  };

  return {
    generalConfig,
    setConfig,
    updateConfig,
    updateSingleValue,
  };
};

export default useGeneralConfiguration;
