import React, { useEffect, useReducer } from 'react';
import { Global_Context } from '@ts/global.types';
import { initialState, globalReducer } from './reducer';

import { useRouter } from 'next/router';
import { useTierQuery } from 'src/api/tier/use-tier-query';
import { useProfileQuery } from 'src/api/profile/use-profile-query';

export const GlobalContext = React.createContext<Global_Context>(initialState);

export const GlobalCTXProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const { tier, isLoading: isLoading1 } = useTierQuery();
  const { profile, isLoading: isLoading2 } = useProfileQuery();

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,

        // Dynamically get initial value for translations
        content: require(`../../../public/locales/${router.locale}.json`),

        tier,
        loadingTier: isLoading1,

        profile,
        loadingProfile: isLoading2,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
