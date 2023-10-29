import { Auth_Context, Auth_Context_Action } from '@ts/auth.types';

const noop = () => false;

export const initialState: Auth_Context = {
  dispatch: noop,

  redirectTo: '',
  cookieDomain: '',
};

export const globalReducer = (state: Auth_Context, action: Auth_Context_Action): Auth_Context => {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload };

    case 'SET_QUERY':
      return {
        ...state,
        redirectTo: action.payload.redirectTo || '',
        cookieDomain: action.payload.cookieDomain || '',
      };

    default:
      return state;
  }
};
