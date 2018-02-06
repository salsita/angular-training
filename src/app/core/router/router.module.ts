import { NgModule } from '@angular/core';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
  routerReducer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { RouterSelectors } from './router.selectors';
import { CustomRouterStateSerializer } from './router.serializer';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer, { initialState: {} }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' })
  ],
  providers: [
    RouterSelectors,
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ]
})
export class RouterModule {}
