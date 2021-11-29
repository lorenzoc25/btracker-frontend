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
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: FC = ({ children }) => {
  const initializeState = (
    initialValue = initialState,
  ): State => {
    if (typeof window === 'undefined') {
      return initialState;
    }
    const localState = localStorage.getItem('state');
    if (localState === null) {
      return initialValue;
    }
    return JSON.parse(localState);
  };

  const [state, dispatch] = useImmerReducer(
    reducer,
    initialState,
    initializeState,
  );

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
