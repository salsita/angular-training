import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { hot } from 'jest-marbles';

import { RouterState } from './router.interfaces';
import { RouterSelectors } from './router.selectors';
import { ROUTER_STORE_NAMESPACE } from './router.tokens';

interface AppState {
  router: RouterState;
}

describe('RouterSelectors', () => {
  const namespace = 'router';

  let service: RouterSelectors;
  let store: Store<AppState>;

  const routerState = {
    state: 'someData'
  };

  const initialState = {
    [namespace]: routerState
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}, { initialState })],
      providers: [
        RouterSelectors,
        {
          provide: ROUTER_STORE_NAMESPACE,
          useValue: namespace
        }
      ]
    });

    service = TestBed.get(RouterSelectors);
    store = TestBed.get(Store);
  });

  describe('getFlatRouterState', () => {
    it('getFlatRouterState', () => {
      const result$ = hot('a', { a: routerState.state });
      expect(service.getFlatRouterState()).toBeObservable(result$);
    });
  });
});
