import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiErrorToastComponent } from './api/api-error-toast/api-error-toast.component';
import { ApiLoaderComponent } from './api/api-loader/api-loader.component';
import { APIInterceptor, API_BASE_URL } from './api/api.interceptor';
import { ApiSelectors } from './api/api.selectors';
import { ApiService } from './api/api.service';
import { CrudSelectors } from './crud/crud.selectors';
import { CrudService } from './crud/crud.service';
import { EntityRepositorySelectors } from './entity-repository/entity-repository.selectors';
import { EntityRepositoryService } from './entity-repository/entity-repository.service';
import { RouterSelectors } from './router/router.selectors';

@NgModule({
  imports: [CommonModule],
  declarations: [ApiLoaderComponent, ApiErrorToastComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [ApiService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl
    },
    ApiSelectors,
    ApiService,
    CrudSelectors,
    CrudService,
    EntityRepositorySelectors,
    EntityRepositoryService,
    RouterSelectors
  ],
  exports: [ApiLoaderComponent, ApiErrorToastComponent]
})
export class CoreModule {}
