import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterState } from './router.interfaces';
import { ROUTER_STORE_NAMESPACE } from './router.tokens';

@Injectable()
export class RouterSelectors {
  constructor(
    @Inject(ROUTER_STORE_NAMESPACE) private namespace: string,
    private store: Store<any>
  ) {}

  private getRouterState() {
    return this.store.select(this.namespace) as Store<RouterState>;
  }

  getFlatRouterState() {
    return this.getRouterState().select('state');
  }
}
