import { createReducer } from './../ngrx-helpers/create-reducer';

import { apiActionTypes } from './api.actions';
import { ApiErrorPayload, ApiState } from './api.interfaces';

export const apiInitialState: ApiState = {
  callsInProgress: 0,
  error: null
};

const apiError = (state: ApiState, { payload }: { payload: ApiErrorPayload }): ApiState => ({
  ...state,
  error: payload
});

const startLoading = (state: ApiState): ApiState => ({
  ...state,
  callsInProgress: state.callsInProgress + 1
});

const stopLoading = (state: ApiState): ApiState => ({
  ...state,
  callsInProgress: state.callsInProgress - 1
});

export const apiReducer = createReducer(
  {
    [apiActionTypes.API_ERROR]: apiError,
    [apiActionTypes.START_LOADING]: startLoading,
    [apiActionTypes.STOP_LOADING]: stopLoading
  },
  apiInitialState
);
