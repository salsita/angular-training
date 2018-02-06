import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ApiErrorToastComponent } from './api-error-toast/api-error-toast.component';
import { ApiLoaderComponent } from './api-loader/api-loader.component';
import { APIInterceptor, API_BASE_URL } from './api.interceptor';
import { apiInitialState, apiReducer } from './api.reducer';
import { ApiSelectors } from './api.selectors';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('api', apiReducer, { initialState: apiInitialState })
  ],
  declarations: [ApiLoaderComponent, ApiErrorToastComponent],
  exports: [ApiErrorToastComponent, ApiLoaderComponent],
  providers: []
})
export class ApiModule {
  static forRoot(baseUrl: string): ModuleWithProviders {
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
          provide: APP_INITIALIZER,
          useFactory: () => () => {},
          deps: [ApiService],
          multi: true
        }
      ]
    };
  }
}
