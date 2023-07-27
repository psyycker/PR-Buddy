import type {fs as FsType} from '@tauri-apps/api';
import type IAppConfig from '../typedefs/app-config.ts';

const getBaseUrl = async () => {
    const {documentDir} = await import('@tauri-apps/api/path');
    return `${await documentDir()}pr-buddy`;
};

const getAppConfigUrl = async () => {
    const baseUrl = await getBaseUrl();
    return `${baseUrl}/app-config.json`;
};

let checkDone = false;

const getFs = async (): Promise<typeof FsType> => {
    const {fs} = await import('@tauri-apps/api');
    const baseUrl = await getBaseUrl();
    const exists = await fs.exists(baseUrl);
    if (!checkDone) {
        if (!exists) {
            await fs.createDir(baseUrl);
        }
        if (!(await fs.exists(await getAppConfigUrl()))) {
            await fs.writeTextFile(await getAppConfigUrl(), '{}');
        }
        checkDone = true;
    }
    return fs;
};


export const getAppConfig = async (): Promise<IAppConfig> => {
    const fs = await getFs();
    const configStr = await fs.readTextFile(await getAppConfigUrl());
    return JSON.parse(configStr);
};

export const saveAppConfig = async (appConfig: IAppConfig) => {
    const fs = await getFs();
    fs.writeTextFile(await getAppConfigUrl(), JSON.stringify(appConfig, undefined, 2));
};
