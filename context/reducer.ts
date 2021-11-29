import { Action, State } from '../types/context';

const reducer = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case 'SetToken':
      state.token = action.payload.token;
      break;

    default:
      break;
  }
};

export default reducer;
