export interface TokenState {
  error?: Error;
  isLoading: boolean;
  token?: string;
}

export const initialTokenState: TokenState = {
  isLoading: true,
};

export type TokenAction =
  | { type: 'GET_TOKEN_COMPLETE'; token: string }
  | { type: 'ERROR'; error: Error };

export const tokenReducer = (
  state: TokenState,
  action: TokenAction
): TokenState => {
  switch (action.type) {
    case 'GET_TOKEN_COMPLETE':
      return {
        ...state,
        token: action.token,
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
