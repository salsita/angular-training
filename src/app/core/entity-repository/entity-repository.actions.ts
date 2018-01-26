import { CrudId } from '../crud/crud.interfaces';
import { ActionCreatorFactory } from '../ngrx-helpers/action-creator-factory';

export const entityRepositoryActionTypes = {
  REPOSITORY_HAS_CHANGED: 'entity-repository/changed'
};

export const entityRepositoryActionCreators = {
  repositoryHasChanged: ActionCreatorFactory.create<CrudId | CrudId[]>(
    entityRepositoryActionTypes.REPOSITORY_HAS_CHANGED
  )
};
