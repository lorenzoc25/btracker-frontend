import { Package } from './package';

export interface State {
  token: string;
  username: string;
  email: string;
  packageList: Package[];
}

interface SetState {
  type: 'SetState';
  payload: {
    username: string;
    email: string;
    token: string;
    packageList: Package[];
  };
}

interface SetPackageList {
  type: 'SetPackageList';
  payload: {
    packageList: Package[];
  };
}

interface SetTokenAction {
  type: 'SetToken';
  payload: {
    token: string;
  };
}

interface SetUsernameAction {
  type: 'SetUsername';
  payload: {
    username: string;
  };
}

interface SetEmailAction {
  type: 'SetEmail';
  payload: {
    email: string;
  };
}

export type Action =
  | SetState
  | SetPackageList
  | SetTokenAction
  | SetUsernameAction
  | SetEmailAction;
