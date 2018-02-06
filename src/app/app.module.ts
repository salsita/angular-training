import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './core/api';
import { CoreModule } from './core/core.module';
import { CrudModule } from './core/crud';
import { EntityRepositoryModule } from './core/entity-repository';
import { RouterModule } from './core/router';
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
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],

    ApiModule.forRoot(environment.apiBaseUrl),
    CrudModule,
    EntityRepositoryModule,
    RouterModule,
    CoreModule,
    AppRoutingModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
