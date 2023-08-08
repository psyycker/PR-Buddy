import { type Repositories } from './repositories.ts';

export interface IGeneralConfig {
    filterOlderThanDays: number;
    hideAfterApprovals: number;
}

export default interface IAppConfig {
    githubToken: string;
    initialized: boolean;
    repositories: Repositories;
    general: IGeneralConfig
}
