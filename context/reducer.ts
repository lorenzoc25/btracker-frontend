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
      state.packageList = action.payload.packageList;
      break;

    case 'SetPackageList':
      state.packageList = action.payload.packageList;
      break;

    case 'AddPackage':
      state.packageList.unshift(action.payload.package);
      break;

    case 'UpdatePackage':
      state.packageList.filter(
        (item) => item.tracking === action.payload.tracking,
      ).forEach(
        (item) => {
          item.name = action.payload.name;
        },
      );
      break;

    case 'DeletePackage':
      state.packageList = state.packageList.filter(
        (item) => item.tracking !== action.payload.tracking,
      );
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
