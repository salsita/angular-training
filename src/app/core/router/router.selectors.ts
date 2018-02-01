import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterStateRoot } from './router.interfaces';

@Injectable()
export class RouterSelectors {
  constructor(private store: Store<RouterStateRoot>) {}

  getRouterState() {
    return this.store.select('router');
  }

  getFlatRouterState() {
    return this.getRouterState().select('state');
  }
}
