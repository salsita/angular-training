import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityRepositoryStateRoot } from './entity-repository.interfaces';

@Injectable()
export class EntityRepositorySelectors {
  constructor(private store: Store<EntityRepositoryStateRoot>) {}

  getEntityRepository() {
    return this.store.select('entityRepository');
  }
}
