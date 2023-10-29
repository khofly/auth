import { AuthContext } from './CTX';
import { useContext } from 'react';

const useAuthCtx = () => {
  const { dispatch, cookieDomain, redirectTo } = useContext(AuthContext);

  return {
    redirectTo,
    cookieDomain,
  };
};

export default useAuthCtx;
