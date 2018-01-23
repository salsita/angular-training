import { createReducer } from './../ngrx-helpers/create-reducer';
import { crudActionTypes } from './crud.actions';
import { CrudState, EntitiesFetchedPayload } from './crud.interfaces';

export const crudInitialState: CrudState = {};

const entitiesFetched = (state: CrudState, { payload }: { payload: EntitiesFetchedPayload }): CrudState => ({
  ...state,
  [payload.route]: {
    ...(state[payload.route] || {}),
    [payload.key]: payload.result
  }
});

export const crudReducer = createReducer({
  [crudActionTypes.ENTITIES_FETCHED]: entitiesFetched
}, crudInitialState);
