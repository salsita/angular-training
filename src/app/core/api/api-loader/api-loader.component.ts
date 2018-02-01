import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApiStateRoot } from '../api.interfaces';
import { isLoading } from '../api.selectors';

@Component({
  selector: 'app-api-loader',
  templateUrl: './api-loader.component.html',
  styleUrls: ['./api-loader.component.scss']
})
export class ApiLoaderComponent {
  isLoading$: Observable<boolean>;

  constructor(store: Store<ApiStateRoot>) {
    this.isLoading$ = isLoading(store);
  }
}
