import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { EntitiesFetchedPayload } from './crud.interfaces';

export const crudActionTypes = {
  ENTITIES_FETCHED: 'crud/entities-fetched'
};

export const crudActionCreators = {
  entitiesFetched: ActionCreatorFactory
    .create<EntitiesFetchedPayload>(crudActionTypes.ENTITIES_FETCHED)
};
