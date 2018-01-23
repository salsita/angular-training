import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    `<h1>This is a testing application</h1>
     <router-outlet></router-outlet>
     <app-api-loader></app-api-loader>
     <app-api-error-toast></app-api-error-toast>`
})
export class AppComponent {}
