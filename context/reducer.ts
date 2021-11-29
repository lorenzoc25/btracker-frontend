import { Action, State } from '../types/context';

const reducer = (
  state: State,
  action: Action,
) => {
  switch (action.type) {
    case 'SetState':
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      break;

    case 'SetToken':
      state.token = action.payload.token;
      break;

    case 'SetUsername':
      state.username = action.payload.username;
      break;

    case 'SetEmail':
      state.email = action.payload.email;
      break;

    default:
      break;
  }
};

export default reducer;
