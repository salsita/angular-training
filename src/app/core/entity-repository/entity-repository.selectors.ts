import { Store } from '@ngrx/store';

import { EntityRepositoryStateRoot } from './entity-repository.interfaces';

export const getEntityRepository = (store: Store<EntityRepositoryStateRoot>) =>
  store.select('entityRepository');
