import {
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
} from '@auth0/auth0-spa-js';
import { useEffect, useReducer } from 'react';
import { initialTokenState, tokenReducer, TokenState } from './token-reducer';
import useAuth0 from './use-auth0';
import { loginError } from './utils';

const useTokenBase = (
  options?: GetTokenWithPopupOptions | GetTokenSilentlyOptions,
  usePopop?: boolean
): TokenState => {
  const {
    getToken,
    getTokenWithPopup,
    isLoading,
    isAuthenticated,
  } = useAuth0();
  const [state, dispatch] = useReducer(tokenReducer, initialTokenState);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      dispatch({ type: 'ERROR', error: new Error('Not authenticated') });
    }

    (async (): Promise<void> => {
      try {
        let token;
        if (usePopop) {
          token = await getTokenWithPopup(options);
        } else {
          token = await getToken(options);
        }

        dispatch({ type: 'GET_TOKEN_COMPLETE', token });
      } catch (error) {
        dispatch({ type: 'ERROR', error: loginError(error) });
      }
    })();
    // Intentionally skipping options (scope and audience)
    // because we'll use the Auth0Client cache for this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated, usePopop, getTokenWithPopup, getToken]);

  return state;
};

export const useToken = (opts?: GetTokenWithPopupOptions): TokenState =>
  useTokenBase(opts, false);

export const useTokenWithPopup = (
  opts?: GetTokenWithPopupOptions
): TokenState => useTokenBase(opts, true);
