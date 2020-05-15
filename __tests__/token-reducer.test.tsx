import { initialTokenState, tokenReducer } from '../src/token-reducer';

describe('auth-reducer', () => {
  it('should complete when authenticated', async () => {
    const payload = {
      token: '__test_token__',
    };
    expect(
      tokenReducer(initialTokenState, {
        type: 'GET_TOKEN_COMPLETE',
        ...payload,
      })
    ).toEqual({
      ...initialTokenState,
      isLoading: false,
      ...payload,
    });
  });

  it('should handle error', async () => {
    const payload = {
      error: new Error('__test_error__'),
    };
    expect(
      tokenReducer(initialTokenState, { type: 'ERROR', ...payload })
    ).toEqual({
      ...initialTokenState,
      isLoading: false,
      ...payload,
    });
  });
});
