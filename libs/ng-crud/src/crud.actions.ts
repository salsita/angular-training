import { ActionCreatorFactory, actionCreator } from '@salsita/ngrx-helpers';
import { EntitiesFetchedPayload } from './crud.interfaces';

export const crudActionTypes = {
  ENTITIES_FETCHED: 'crud/entities-fetched'
};

const entitiesFetched: actionCreator<EntitiesFetchedPayload> = ActionCreatorFactory.create<
  EntitiesFetchedPayload
>(crudActionTypes.ENTITIES_FETCHED);

export const crudActionCreators = {
  entitiesFetched
};
