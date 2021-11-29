import {
  useMemo,
  useEffect,
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
  packageList: [],
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

  useEffect(() => {
    const localState = localStorage.getItem('state');
    if (localState === null) {
      return;
    }
    const parsedState: State = JSON.parse(localState);
    dispatch({
      type: 'SetState',
      payload: {
        username: parsedState.username,
        email: parsedState.email,
        token: parsedState.token,
        packageList: parsedState.packageList,
      },
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

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
