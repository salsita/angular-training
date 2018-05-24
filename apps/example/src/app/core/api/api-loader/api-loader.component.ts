import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiSelectors } from '@salsita/ng-api';

@Component({
  selector: 'app-api-loader',
  templateUrl: './api-loader.component.html',
  styleUrls: ['./api-loader.component.scss']
})
export class ApiLoaderComponent {
  isLoading$: Observable<boolean>;

  constructor(apiSelectors: ApiSelectors) {
    this.isLoading$ = apiSelectors.isLoading();
  }
}
