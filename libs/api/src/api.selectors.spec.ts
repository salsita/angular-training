import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { hot } from 'jest-marbles';

import { apiActionCreators } from './api.actions';
import { ApiErrorPayload, ApiState } from './api.interfaces';
import { apiReducer } from './api.reducer';
import { ApiSelectors } from './api.selectors';
import { API_STORE_NAMESPACE } from './api.tokens';

interface AppState {
  api: ApiState;
}

describe('ApiSelectors', () => {
  const namespace = 'api';

  let service: ApiSelectors;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ api: apiReducer })],
      providers: [
        ApiSelectors,
        {
          provide: API_STORE_NAMESPACE,
          useValue: namespace
        }
      ]
    });

    service = TestBed.get(ApiSelectors);
    store = TestBed.get(Store);
  });

  describe('getError', () => {
    it('should get no error after startup', () => {
      const result$ = hot('a', { a: null });
      expect(service.getError()).toBeObservable(result$);
    });

    it('should get error', () => {
      const error: ApiErrorPayload = {
        type: 'error',
        reason: 'Some data'
      };

      store.dispatch(apiActionCreators.apiError(error));

      const result$ = hot('a', { a: error.type });
      expect(service.getError()).toBeObservable(result$);
    });
  });
});
