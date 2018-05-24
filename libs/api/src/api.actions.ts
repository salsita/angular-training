import { ActionCreatorFactory, actionCreator } from '@salsita/ngrx-helpers';
import { ApiErrorPayload } from './api.interfaces';

export const apiActionTypes = {
  API_ERROR: 'api/error',
  START_LOADING: 'api/start-loading',
  STOP_LOADING: 'api/stop-loading'
};

const apiError: actionCreator<ApiErrorPayload> = ActionCreatorFactory.create<ApiErrorPayload>(
  apiActionTypes.API_ERROR,
  null
);
const startLoading: actionCreator<void> = ActionCreatorFactory.create<void>(
  apiActionTypes.START_LOADING
);
const stopLoading: actionCreator<void> = ActionCreatorFactory.create<void>(
  apiActionTypes.STOP_LOADING
);

export const apiActionCreators = {
  apiError,
  startLoading,
  stopLoading
};
