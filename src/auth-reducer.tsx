export interface AuthState {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: unknown;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // TODO: SSR support
};

export type AuthAction =
  | { type: 'INITIALISED'; isAuthenticated: boolean; user?: unknown }
  | { type: 'LOGIN_POPUP_STARTED' }
  | { type: 'LOGIN_POPUP_COMPLETE'; isAuthenticated: boolean; user?: unknown }
  | { type: 'ERROR'; error: Error };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN_POPUP_STARTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'INITIALISED':
    case 'LOGIN_POPUP_COMPLETE':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        isLoading: false,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
};
