import {
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js';
import { createContext } from 'react';
import { AuthState, initialAuthState } from './auth-reducer';

export interface Auth0ContextInterface extends AuthState {
  /**
   * Get an access token.
   */
  getToken: (options?: GetTokenSilentlyOptions) => Promise<string>;

  /**
   * Get an access token with a popup.
   */
  getTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;

  /**
   * Login in with a redirect.
   */
  login: (options?: RedirectLoginOptions) => Promise<void>;

  /**
   * Login in with a popup.
   */
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;

  /**
   * Logout.
   */
  logout: (options?: LogoutOptions) => void;
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <Auth0Provider>.');
};

export default createContext<Auth0ContextInterface>({
  ...initialAuthState,
  getToken: stub,
  getTokenWithPopup: stub,
  login: stub,
  loginWithPopup: stub,
  logout: stub,
});
