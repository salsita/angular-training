import { ApiModule } from '@angular-training-mono/api';
import { CrudModule } from '@angular-training-mono/crud';
import { EntityRepositoryModule } from '@angular-training-mono/entity-repository';
import { RouterModule as RouterStoreModule } from '@angular-training-mono/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { ApiErrorToastComponent } from './api/api-error-toast/api-error-toast.component';
import { ApiLoaderComponent } from './api/api-loader/api-loader.component';

@NgModule({
  imports: [
    HttpClientModule,

    ApiModule.forRoot({ storeNamespace: 'api', baseUrl: environment.apiBaseUrl }),
    CrudModule.forRoot({ storeNamespace: 'crud' }),
    EntityRepositoryModule.forRoot({ storeNamespace: 'entityRepository' }),
    RouterStoreModule.forRoot({ storeNamespace: 'router' }),
    SharedModule
  ],
  declarations: [ApiErrorToastComponent, ApiLoaderComponent],
  exports: [ApiErrorToastComponent, ApiLoaderComponent, ApiModule, HttpClientModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
