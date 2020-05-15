import { Auth0Client, PopupLoginOptions } from '@auth0/auth0-spa-js';
import { AuthAction } from './auth-reducer';

const CODE_RE = /[?&]code=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

export type AppState = {
  redirectTo?: string;
  [key: string]: unknown;
};

export const hasAuthParams = (searchParams = window.location.search): boolean =>
  CODE_RE.test(searchParams) || ERROR_RE.test(searchParams);

export const defaultOnRedirectCallback = (appState?: AppState): void => {
  window.history.replaceState(
    {},
    document.title,
    appState?.redirectTo || window.location.pathname
  );
};

export const loginError = (
  error: Error | { error_description: string } | ProgressEvent
): Error =>
  error instanceof Error
    ? error
    : new Error(
        'error_description' in error ? error.error_description : 'Login failed'
      );

export const wrappedLoginWithPopup = async (
  client: Auth0Client,
  dispatch: (action: AuthAction) => void,
  options?: PopupLoginOptions
): Promise<void> => {
  dispatch({ type: 'LOGIN_POPUP_STARTED' });
  try {
    await client.loginWithPopup(options);
  } catch (error) {
    dispatch({ type: 'ERROR', error: loginError(error) });
  }
  const isAuthenticated = await client.isAuthenticated();
  const user = isAuthenticated && (await client.getUser());
  dispatch({ type: 'LOGIN_POPUP_COMPLETE', isAuthenticated, user });
};
