import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  FEATURE_REDUCERS,
  STORE_FEATURES,
  StoreFeatureModule,
  _FEATURE_REDUCERS,
  combineReducers
} from '@ngrx/store';

import { CrudModuleConfig } from './crud.interfaces';
import { crudInitialState, crudReducer } from './crud.reducer';
import { CrudSelectors } from './crud.selectors';
import { CrudService } from './crud.service';
import { CRUD_STORE_NAMESPACE } from './crud.tokens';

@NgModule({
  imports: [StoreFeatureModule]
})
export class CrudModule {
  static forRoot({ storeNamespace }: CrudModuleConfig): ModuleWithProviders {
    return {
      ngModule: CrudModule,
      providers: [
        CrudSelectors,
        CrudService,
        {
          provide: CRUD_STORE_NAMESPACE,
          useValue: storeNamespace
        },
        {
          provide: STORE_FEATURES,
          multi: true,
          useValue: {
            key: storeNamespace,
            reducerFactory: combineReducers,
            metaReducers: [],
            initialState: crudInitialState
          }
        },
        {
          provide: _FEATURE_REDUCERS,
          multi: true,
          useValue: crudReducer
        },
        {
          provide: FEATURE_REDUCERS,
          multi: true,
          useExisting: _FEATURE_REDUCERS
        }
      ]
    };
  }
}
