import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FlatRouterStateSnapshot } from '../router.interfaces';

@Injectable()
export class MockRouterSelectors {
  subjects = {
    getFlatRouterState: new BehaviorSubject<FlatRouterStateSnapshot>({
      url: 'url',
      data: {},
      fragment: '',
      params: {},
      queryParams: {}
    })
  };

  getFlatRouterState() {
    return this.subjects.getFlatRouterState.asObservable();
  }
}
