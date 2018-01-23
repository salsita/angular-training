import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiErrorToastComponent } from './api/api-error-toast/api-error-toast.component';
import { ApiLoaderComponent } from './api/api-loader/api-loader.component';
import { APIInterceptor, API_BASE_URL } from './api/api.interceptor';
import { CrudService } from './crud/crud.service';
import { EntityRepositoryService } from './entity-repository/entity-repository.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ApiLoaderComponent, ApiErrorToastComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl
    },
    CrudService,
    EntityRepositoryService
  ],
  exports: [ApiLoaderComponent, ApiErrorToastComponent]
})
export class CoreModule {}
