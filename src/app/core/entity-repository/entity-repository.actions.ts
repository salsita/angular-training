import { ActionCreatorFactory } from '../ngrx-helpers/action-creator-factory';

export const entityRepositoryActionTypes = {
  REPOSITORY_HAS_CHANGED: 'entity-repository/changed'
};

export const entityRepositoryActionCreators = {
  repositoryHasChanged: ActionCreatorFactory.create<string | string[]>(
    entityRepositoryActionTypes.REPOSITORY_HAS_CHANGED
  )
};
