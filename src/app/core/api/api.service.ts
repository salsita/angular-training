import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { finalize } from 'rxjs/operators/finalize';

import { apiActionCreators } from './api.actions';

@Injectable()
export class ApiService {
  private static requests$ = new Subject<boolean>();

  static startLoading(req: Observable<any>) {
    ApiService.requests$.next(true);
    return req.pipe(finalize(() => ApiService.requests$.next(false)));
  }

  constructor(store: Store<any>) {
    ApiService.requests$.subscribe(loading =>
      store.dispatch(loading ? apiActionCreators.startLoading() : apiActionCreators.stopLoading())
    );
  }
}
