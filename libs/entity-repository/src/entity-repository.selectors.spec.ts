import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { hot } from 'jest-marbles';

import { EntityRepositoryState } from './entity-repository.interfaces';
import { entityRepositoryReducer } from './entity-repository.reducer';
import { EntityRepositorySelectors } from './entity-repository.selectors';
import { ENTITY_REPOSITORY_STORE_NAMESPACE } from './entity-repository.tokens';

interface AppState {
  entityRepository: EntityRepositoryState<any>;
}

describe('EntityRepositorySelectors', () => {
  const namespace = 'entityRepository';

  let service: EntityRepositorySelectors;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ entityRepository: entityRepositoryReducer })],
      providers: [
        EntityRepositorySelectors,
        {
          provide: ENTITY_REPOSITORY_STORE_NAMESPACE,
          useValue: namespace
        }
      ]
    });

    service = TestBed.get(EntityRepositorySelectors);
    store = TestBed.get(Store);
  });

  describe('getEntityRepository', () => {
    it('should get empty store', () => {
      const result$ = hot('a', { a: {} });
      expect(service.getEntityRepository()).toBeObservable(result$);
    });
  });
});
