import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiStateRoot } from './api.interfaces';

@Injectable()
export class ApiSelectors {
  constructor(private store: Store<ApiStateRoot>) {}

  getApi() {
    return this.store.select('api');
  }

  getError() {
    return this.getApi().select(state => (state.error ? state.error.type : null));
  }

  isLoading() {
    return this.getApi().select(state => state.callsInProgress > 0);
  }
}
