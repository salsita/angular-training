import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  ROUTER_CONFIG,
  RouterStateSerializer,
  StoreRouterConnectingModule,
  routerReducer
} from '@ngrx/router-store';
import {
  FEATURE_REDUCERS,
  STORE_FEATURES,
  StoreModule,
  _FEATURE_REDUCERS,
  combineReducers
} from '@ngrx/store';

import { RouterModuleConfig } from './router.interfaces';
import { RouterSelectors } from './router.selectors';
import { CustomRouterStateSerializer } from './router.serializer';
import { ROUTER_STORE_NAMESPACE } from './router.tokens';

@NgModule({
  imports: [StoreModule, StoreRouterConnectingModule]
})
export class RouterModule {
  static forRoot({ storeNamespace }: RouterModuleConfig): ModuleWithProviders {
    return {
      ngModule: RouterModule,
      providers: [
        RouterSelectors,
        {
          provide: ROUTER_CONFIG,
          useValue: {
            stateKey: storeNamespace
          }
        },
        {
          provide: RouterStateSerializer,
          useClass: CustomRouterStateSerializer
        },
        {
          provide: ROUTER_STORE_NAMESPACE,
          useValue: storeNamespace
        },
        {
          provide: STORE_FEATURES,
          multi: true,
          useValue: {
            key: storeNamespace,
            reducerFactory: combineReducers,
            metaReducers: [],
            initialState: {}
          }
        },
        {
          provide: _FEATURE_REDUCERS,
          multi: true,
          useValue: routerReducer
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
