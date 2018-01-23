import { Store } from '@ngrx/store';

import { CrudStateRoot } from './crud.interfaces';

export const getCrud = (store: Store<CrudStateRoot>) => store.select('crud');
