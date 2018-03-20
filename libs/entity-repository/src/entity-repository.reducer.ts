import { mergeWith } from 'lodash';

import { createReducer } from '@angular-training/ngrx-helpers';
import { entityRepositoryActionTypes } from './entity-repository.actions';
import { EntityRepositoryState } from './entity-repository.interfaces';

const entityRepositoryInitialState: EntityRepositoryState<any> = {};

const repositoryHasChanged = (
  state: EntityRepositoryState<any>,
  { payload }: { payload: EntityRepositoryState<any> }
): EntityRepositoryState<any> =>
  mergeWith({}, state, payload, (objValue, srcValue) => {
    // If merging two arrays, just replace original value
    // with new one
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
      return srcValue;
    }

    // Other values merge as expected
    return undefined;
  });

export const entityRepositoryReducer = createReducer(
  {
    [entityRepositoryActionTypes.REPOSITORY_HAS_CHANGED]: repositoryHasChanged
  },
  entityRepositoryInitialState
);
