import React, { useEffect, useReducer } from 'react';
import { Auth_Context } from '@ts/auth.types';
import { initialState, globalReducer } from './reducer';

import { useRouter } from 'next/router';

export const AuthContext = React.createContext<Auth_Context>(initialState);

export const AuthCTXProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const redirectTo = router.query.redirectTo as string;
    const cookieDomain = router.query.cookieDomain as string;

    if (!state.redirectTo && redirectTo) {
      dispatch({ type: 'SET_QUERY', payload: { redirectTo, cookieDomain } });
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router.query]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
