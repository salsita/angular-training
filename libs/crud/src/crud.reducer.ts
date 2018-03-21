import { createReducer, reducerType } from '@angular-training/ngrx-helpers';
import { crudActionTypes } from './crud.actions';
import { CrudState, EntitiesFetchedPayload } from './crud.interfaces';

const crudInitialState: CrudState = {};

const entitiesFetched = (
  state: CrudState,
  { payload }: { payload: EntitiesFetchedPayload }
): CrudState => ({
  ...state,
  [payload.route]: {
    ...(state[payload.route] || {}),
    [payload.key]: payload.result
  }
});

export const crudReducer: reducerType<CrudState> = createReducer(
  {
    [crudActionTypes.ENTITIES_FETCHED]: entitiesFetched
  },
  crudInitialState
);
