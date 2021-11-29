export interface State {
  token?: string;
}

interface SetTokenAction {
  type: 'SetToken';
  payload: {
    token: string;
  };
}

export type Action =
 | SetTokenAction;
