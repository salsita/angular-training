import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  FEATURE_REDUCERS,
  STORE_FEATURES,
  StoreFeatureModule,
  _FEATURE_REDUCERS,
  combineReducers
} from '@ngrx/store';

import { ApiErrorToastComponent } from './api-error-toast/api-error-toast.component';
import { ApiLoaderComponent } from './api-loader/api-loader.component';
import { APIInterceptor, API_BASE_URL } from './api.interceptor';
import { ApiModuleConfig } from './api.interfaces';
import { apiInitialState, apiReducer } from './api.reducer';
import { ApiSelectors } from './api.selectors';
import { ApiService } from './api.service';
import { API_STORE_NAMESPACE } from './api.tokens';

@NgModule({
  imports: [CommonModule, StoreFeatureModule],
  declarations: [ApiLoaderComponent, ApiErrorToastComponent],
  exports: [ApiErrorToastComponent, ApiLoaderComponent]
})
export class ApiModule {
  constructor(apiService: ApiService) {}

  static forRoot({ storeNamespace, baseUrl }: ApiModuleConfig): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        ApiSelectors,
        ApiService,
        {
          provide: API_BASE_URL,
          useValue: baseUrl
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: APIInterceptor,
          multi: true
        },
        {
          provide: API_STORE_NAMESPACE,
          useValue: storeNamespace
        },
        {
          provide: STORE_FEATURES,
          multi: true,
          useValue: {
            key: storeNamespace,
            reducerFactory: combineReducers,
            metaReducers: [],
            initialState: apiInitialState
          }
        },
        {
          provide: _FEATURE_REDUCERS,
          multi: true,
          useValue: apiReducer
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
