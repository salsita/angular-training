import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiModule } from './api';
import { CrudModule } from './crud';
import { EntityRepositoryModule } from './entity-repository';
import { RouterModule as RouterStoreModule } from './router';

@NgModule({
  imports: [
    HttpClientModule,

    ApiModule.forRoot({ storeNamespace: 'api', baseUrl: environment.apiBaseUrl }),
    CrudModule.forRoot({ storeNamespace: 'crud' }),
    EntityRepositoryModule.forRoot({ storeNamespace: 'entityRepository' }),
    RouterStoreModule.forRoot({ storeNamespace: 'router' })
  ],
  exports: [ApiModule, HttpClientModule]
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
