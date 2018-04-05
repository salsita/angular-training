import { ActionCreatorFactory, actionCreator } from '@angular-training/ngrx-helpers';
import { EntityRepositoryState } from './entity-repository.interfaces';

export const entityRepositoryActionTypes = {
  REPOSITORY_HAS_CHANGED: 'entity-repository/changed'
};

const repositoryHasChanged: actionCreator<EntityRepositoryState<any>> = ActionCreatorFactory.create<
  EntityRepositoryState<any>
>(entityRepositoryActionTypes.REPOSITORY_HAS_CHANGED);

export const entityRepositoryActionCreators = {
  repositoryHasChanged
};
