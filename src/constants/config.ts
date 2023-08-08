import type IAppConfig from 'types/app-config';

export const DEFAULT_APP_CONFIG: IAppConfig = {
  githubToken: '',
  repositories: [],
  initialized: false,
  general: {
    filterOlderThanDays: 0,
    hideAfterApprovals: 0,
  },
};
