export interface State {
  token: string;
  username: string;
  email: string;
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
 | SetTokenAction
 | SetUsernameAction
 | SetEmailAction;
