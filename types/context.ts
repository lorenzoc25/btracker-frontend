export interface State {
  token: string;
  username: string;
  email: string;
}

interface SetState {
  type: 'SetState';
  payload: {
    username: string;
    email: string;
    token: string;
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
  | SetTokenAction
  | SetUsernameAction
  | SetEmailAction;
