import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiState } from './api.interfaces';
import { API_STORE_NAMESPACE } from './api.tokens';

@Injectable()
export class ApiSelectors {
  constructor(@Inject(API_STORE_NAMESPACE) private namespace: string, private store: Store<any>) {}

  getApi() {
    return this.store.select(this.namespace) as Store<ApiState>;
  }

  getError() {
    return this.getApi().select(state => (state.error ? state.error.type : null));
  }

  isLoading() {
    return this.getApi().select(state => state.callsInProgress > 0);
  }
}
