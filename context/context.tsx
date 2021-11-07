import {
  createContext,
  Dispatch,
  FC,
} from 'react';
import { useImmerReducer } from 'use-immer';

import { reducer } from './reducer';
import { State, Action } from '../types/context';

const initialState: State = {};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(
    reducer,
    initialState,
  );
  return (
    <AppContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
