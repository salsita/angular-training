import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { hot } from 'jest-marbles';

import { CrudState } from './crud.interfaces';
import { crudReducer } from './crud.reducer';
import { CrudSelectors } from './crud.selectors';
import { CRUD_STORE_NAMESPACE } from './crud.tokens';

interface AppState {
  crud: CrudState;
}

describe('CrudSelectors', () => {
  const namespace = 'crud';

  let service: CrudSelectors;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ crud: crudReducer })],
      providers: [
        CrudSelectors,
        {
          provide: CRUD_STORE_NAMESPACE,
          useValue: namespace
        }
      ]
    });

    service = TestBed.get(CrudSelectors);
    store = TestBed.get(Store);
  });

  describe('getCrud', () => {
    it('should get empty store', () => {
      const result$ = hot('a', { a: {} });
      expect(service.getCrud()).toBeObservable(result$);
    });
  });
});
