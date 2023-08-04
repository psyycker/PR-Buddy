import { DEFAULT_APP_CONFIG } from 'constants/config.ts';
import type { fs as FsType } from '@tauri-apps/api';
import type IAppConfig from '../types/app-config';

const getBaseUrl = async (): Promise<string> => {
  const { appDataDir } = await import('@tauri-apps/api/path');
  return `${await appDataDir()}`;
};

const getAppConfigUrl = async (): Promise<string> => {
  const baseUrl = await getBaseUrl();
  return `${baseUrl}app-config.json`;
};

const getFs = async (): Promise<typeof FsType> => {
  const { fs } = await import('@tauri-apps/api');
  return fs;
};

export const init = async (): Promise<void> => {
  try {
    const fs = await getFs();
    const appConfig = await getAppConfigUrl();
    const exists = await fs.exists(appConfig);
    if (!exists) {
      const baseUrl = await getBaseUrl();
      await fs.createDir(baseUrl, {
        recursive: true,
      });
      await fs.writeTextFile(
        appConfig,
        JSON.stringify(DEFAULT_APP_CONFIG, undefined, 2),
      );
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAppConfig = async (): Promise<IAppConfig> => {
  const fs = await getFs();
  const configStr = await fs.readTextFile(await getAppConfigUrl());
  return JSON.parse(configStr);
};

export const saveAppConfig = async (appConfig: IAppConfig): Promise<void> => {
  const fs = await getFs();
  await fs.writeTextFile(await getAppConfigUrl(), JSON.stringify(appConfig, undefined, 2));
};
