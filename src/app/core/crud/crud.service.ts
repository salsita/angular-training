import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { tap } from 'rxjs/operators/tap';

import { EntityRepositoryService } from '../entity-repository/entity-repository.service';
import { RouterSelectors } from '../router/router.selectors';
import { crudActionCreators } from './crud.actions';
import { CrudResolver } from './crud.resolver';

@Injectable()
export class CrudService {
  constructor(
    private store: Store<any>,
    private repo: EntityRepositoryService,
    private routerSelectors: RouterSelectors
  ) {}

  handleRequest(
    data$: Observable<any>,
    entitySchema: schema.Entity | schema.Entity[],
    route: string,
    key: string
  ) {
    return data$.pipe(
      map(data => this.repo.normalizeAndStore(data, entitySchema)),
      tap(result => this.storeCrudData(route, key, result))
    );
  }

  storeCrudData(route: string, key: string, result: string | string[]) {
    this.store.dispatch(crudActionCreators.entitiesFetched({ result, route, key }));
  }

  resolve<T extends CrudResolver>(resolver: T): Observable<any> {
    return this.routerSelectors
      .getFlatRouterState()
      .pipe(
        take(1),
        map(storeParams => resolver.params(storeParams)),
        switchMap(params =>
          this.handleRequest(
            resolver.data(...params),
            resolver.schema,
            resolver.route,
            resolver.key
          )
        )
      );
  }
}
