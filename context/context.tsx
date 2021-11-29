import {
  useMemo,
  createContext,
  Dispatch,
  FC,
} from 'react';
import { useImmerReducer } from 'use-immer';

import reducer from './reducer';
import { State, Action } from '../types/context';

const initialState: State = {
  token: '',
  username: '',
  email: '',
};

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
  const context = useMemo(() => ({
    state,
    dispatch,
  }), [state]);

  return (
    <AppContext.Provider
      value={context}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
