import { apiActionCreators } from './api.actions';
import { ApiErrorPayload, ApiState } from './api.interfaces';
import { apiReducer } from './api.reducer';

describe('apiReducer', () => {
  let state: ApiState;

  describe('API_ERROR', () => {
    it('should set error', () => {
      const error: ApiErrorPayload = {
        type: 'error',
        reason: 'Some reason'
      };

      state = apiReducer();
      expect(state.error).toBe(null);

      state = apiReducer(state, apiActionCreators.apiError(error));
      expect(state.error).toBe(error);

      state = apiReducer(state, apiActionCreators.apiError(null));
      expect(state.error).toBe(null);
    });
  });

  describe('START_LOADING / STOP_LOADING', () => {
    it('should set progress counter', () => {
      state = apiReducer();
      expect(state.callsInProgress).toBe(0);

      state = apiReducer(state, apiActionCreators.startLoading());
      state = apiReducer(state, apiActionCreators.startLoading());
      expect(state.callsInProgress).toBe(2);

      state = apiReducer(state, apiActionCreators.stopLoading());
      state = apiReducer(state, apiActionCreators.stopLoading());
      expect(state.callsInProgress).toBe(0);
    });
  });
});
