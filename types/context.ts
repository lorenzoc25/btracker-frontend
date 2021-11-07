export interface State {}

interface AddAction {
  type: 'ADD';
}

interface DeleteAction {
  type: 'ADD';
  payload: {
    id: string;
  };
}

export type Action =
 | AddAction
 | DeleteAction;
