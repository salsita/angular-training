import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

import { CrudId } from '../crud/crud.interfaces';

export const entityRepositoryActionTypes = {
  REPOSITORY_HAS_CHANGED: 'entity-repository/changed'
};

export const entityRepositoryActionCreators = {
  repositoryHasChanged: ActionCreatorFactory
    .create<CrudId | CrudId[]>(entityRepositoryActionTypes.REPOSITORY_HAS_CHANGED)
};
