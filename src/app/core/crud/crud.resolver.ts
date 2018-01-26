import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { publish } from 'rxjs/operators/publish';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

import { FlatRouterStateSnapshot, RouterStateRoot } from '../router/router.interfaces';
import { getFlatRouterState } from '../router/router.selectors';
import { CrudId } from './crud.interfaces';
import { CrudService } from './crud.service';

export abstract class CrudResolver implements Resolve<CrudId | CrudId[]> {
  blocking = true;
  abstract schema: schema.Entity | schema.Entity[];
  abstract route: string;
  abstract key: string;

  private changes$ = new Subject();
  private data$: ConnectableObservable<CrudId | CrudId[]>;

  constructor(private crud: CrudService, store: Store<RouterStateRoot>) {
    this.data$ = this.changes$.pipe(
      withLatestFrom(getFlatRouterState(store)),
      map(([routerParams, storeParams]) => this.params(storeParams)),
      switchMap(params =>
        this.crud.handleRequest(this.data.apply(this, params), this.schema, this.route, this.key)
      ),
      publish()
    ) as ConnectableObservable<CrudId | CrudId[]>;

    this.data$.connect();
  }

  params(route: FlatRouterStateSnapshot): any[] {
    return [];
  }

  abstract data(...params: any[]): Observable<any>;

  resolve() {
    const resolve$ = this.blocking ? this.data$.pipe(take(1)) : of([]);

    this.changes$.next(true);

    return resolve$;
  }
}
