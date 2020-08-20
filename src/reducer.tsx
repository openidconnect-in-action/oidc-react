import { AuthState, User } from './auth-state';

type Action =
  | { type: 'HANDLE_REDIRECT_CALLBACK_STARTED' }
  | { type: 'CHECK_SESSION_STARTED' }
  | { type: 'LOGIN_POPUP_STARTED' }
  | {
      type:
        | 'CHECK_SESSION_CALLBACK_COMPLETE'
        | 'HANDLE_REDIRECT_CALLBACK_COMPLETE'
        | 'LOGIN_POPUP_COMPLETE';
      isAuthenticated: boolean;
      user?: User;
    }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: Error };

/**
 * Handles how that state changes in the `useAuth0` hook.
 */
export const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_POPUP_STARTED':
      return {
        ...state,
        isPopupOpen: true,
      };
    case 'HANDLE_REDIRECT_CALLBACK_STARTED':
      return {
        ...state,
        isLoadingHandleCallback: true,
      };
    case 'CHECK_SESSION_STARTED':
      return {
        ...state,
        isLoadingCheckSession: true,
      };
    case 'LOGIN_POPUP_COMPLETE':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        isPopupOpen: false,
        error: undefined,
      };
    case 'CHECK_SESSION_CALLBACK_COMPLETE':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        isLoadingCheckSession: false,
        error: undefined,
      };
    case 'HANDLE_REDIRECT_CALLBACK_COMPLETE':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        isLoadingHandleCallback: false,
        error: undefined,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case 'ERROR':
      return {
        ...state,
        // TODO: might need separate errors for each loading type
        isLoadingHandleCallback: false,
        isLoadingCheckSession: false,
        isPopupOpen: false,
        error: action.error,
      };
  }
};
