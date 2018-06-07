import { Component } from '@angular/core';
import { ApiSelectors } from '@salsita/ng-api';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-api-error-toast',
  templateUrl: './api-error-toast.component.html',
  styleUrls: ['./api-error-toast.component.scss']
})
export class ApiErrorToastComponent {
  error$: Observable<string | null>;

  constructor(apiSelectors: ApiSelectors) {
    this.error$ = apiSelectors.getError();
  }
}
