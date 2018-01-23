import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { normalize } from 'normalizr';

import { CrudId } from '../crud/crud.interfaces';
import { entityRepositoryActionCreators } from './entity-repository.actions';

@Injectable()
export class EntityRepositoryService {
  constructor(private store: Store<any>) {}

  normalizeAndStore(data: any | any[], schema: any): CrudId | CrudId[] {
    const { entities: repository, result } = normalize(data, schema);
    this.store.dispatch(entityRepositoryActionCreators.repositoryHasChanged(repository));

    return result;
  }
}
