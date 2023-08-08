import type React from 'react';
import { type Reducer } from 'react';
import type { IGeneralConfig } from 'types/app-config';

interface State {
  filterOlderThanDays: number;
  hideAfterApprovals: number;
}

export const initialState: State = {
  filterOlderThanDays: 14,
  hideAfterApprovals: 2,
};

type Action =
  {type: 'SET_FILTER_OLDER_THAN_DAYS', payload: number}
  | {type: 'SET_HIDE_AFTER_APPROVALS', payload: number}
  | {type: 'FROM_CONFIG', payload: IGeneralConfig}

export const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_FILTER_OLDER_THAN_DAYS':
      return ({
        ...state,
        filterOlderThanDays: action.payload,
      });
    case 'SET_HIDE_AFTER_APPROVALS':
      return {
        ...state,
        hideAfterApprovals: action.payload,
      };
    case 'FROM_CONFIG':
      return action.payload;
    default:
      return state;
  }
};

export const getDispatchActions = (dispatch: React.Dispatch<Action>) => ({
  setFilterOlderThanDays: (value: number) => { dispatch({ type: 'SET_FILTER_OLDER_THAN_DAYS', payload: value }); },
  setHideAfterApprovals: (value: number) => { dispatch({ type: 'SET_HIDE_AFTER_APPROVALS', payload: value }); },
  fromConfig: (config: IGeneralConfig) => { dispatch({ type: 'FROM_CONFIG', payload: config }); },
});
