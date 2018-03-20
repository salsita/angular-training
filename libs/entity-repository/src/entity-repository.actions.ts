import { ActionCreatorFactory } from '@angular-training/ngrx-helpers';
import { EntityRepositoryState } from './entity-repository.interfaces';

export const entityRepositoryActionTypes = {
  REPOSITORY_HAS_CHANGED: 'entity-repository/changed'
};

export const entityRepositoryActionCreators = {
  repositoryHasChanged: ActionCreatorFactory.create<EntityRepositoryState<any>>(
    entityRepositoryActionTypes.REPOSITORY_HAS_CHANGED
  )
};
