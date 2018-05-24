import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { EntityRepositoryState } from './entity-repository.interfaces';
import { ENTITY_REPOSITORY_STORE_NAMESPACE } from './entity-repository.tokens';

@Injectable()
export class EntityRepositorySelectors {
  constructor(
    @Inject(ENTITY_REPOSITORY_STORE_NAMESPACE) private namespace: string,
    private store: Store<any>
  ) {}

  getEntityRepository() {
    return this.store.select(this.namespace) as Store<EntityRepositoryState<any>>;
  }
}
