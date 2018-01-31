import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { apiInitialState, apiReducer } from './core/api/api.reducer';
import { CoreModule } from './core/core.module';
import { crudInitialState, crudReducer } from './core/crud/crud.reducer';
import {
  entityRepositoryInitialState,
  entityRepositoryReducer
} from './core/entity-repository/entity-repository.reducer';
import { CustomRouterStateSerializer } from './core/router/router.serializer';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // @angular
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    // @nrgx
    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {
        api: apiReducer,
        crud: crudReducer,
        entityRepository: entityRepositoryReducer,
        router: routerReducer
      },
      {
        initialState: {
          api: apiInitialState,
          entityRepository: entityRepositoryInitialState,
          crud: crudInitialState,
          router: {}
        }
      }
    ),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],

    CoreModule,
    AppRoutingModule,
    UsersModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
