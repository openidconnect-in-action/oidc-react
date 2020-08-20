export type User = any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * The auth state which, when combined with the auth methods, make up the return object of the `useAuth0` hook.
 */
export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  isLoadingHandleCallback: boolean;
  isLoadingCheckSession: boolean;
  isPopupOpen: boolean;
  user?: User;
}

// In SSR mode the library will never check the session, so loading should be initialised as false
const isLoading = typeof window !== 'undefined';

/**
 * The initial auth state.
 */
export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoadingHandleCallback: isLoading,
  isLoadingCheckSession: isLoading,
  isPopupOpen: false,
};
