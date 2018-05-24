import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CrudState } from './crud.interfaces';
import { CRUD_STORE_NAMESPACE } from './crud.tokens';

@Injectable()
export class CrudSelectors {
  constructor(@Inject(CRUD_STORE_NAMESPACE) private namespace: string, private store: Store<any>) {}

  getCrud() {
    return this.store.select(this.namespace) as Store<CrudState>;
  }
}
