import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CrudStateRoot } from './crud.interfaces';

@Injectable()
export class CrudSelectors {
  constructor(private store: Store<CrudStateRoot>) {}

  getCrud() {
    return this.store.select('crud');
  }
}
