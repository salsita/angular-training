import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApiStateRoot } from '../api.interfaces';
import { getError } from '../api.selectors';

@Component({
  selector: 'app-api-error-toast',
  templateUrl: './api-error-toast.component.html',
  styleUrls: ['./api-error-toast.component.scss']
})
export class ApiErrorToastComponent {
  error$: Observable<string>;

  constructor(store: Store<ApiStateRoot>) {
    this.error$ = getError(store);
  }
}
