import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { normalize } from 'normalizr';

import { entityRepositoryActionCreators } from './entity-repository.actions';

@Injectable()
export class EntityRepositoryService {
  constructor(private store: Store<any>) {}

  normalizeAndStore(data: any | any[], schema: any): string | string[] {
    const { entities, result } = normalize(data, schema);
    this.store.dispatch(entityRepositoryActionCreators.repositoryHasChanged(entities));

    return result;
  }
}
