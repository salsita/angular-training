import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

import { EntityRepositoryService } from '../entity-repository/entity-repository.service';
import { crudActionCreators } from './crud.actions';

@Injectable()
export class CrudService {
  constructor(private store: Store<any>, private repo: EntityRepositoryService) {}

  handleRequest(
    data$: Observable<any>,
    entitySchema: schema.Entity | schema.Entity[],
    route: string,
    key: string
  ) {
    return data$.pipe(
      map(data => this.repo.normalizeAndStore(data, entitySchema)),
      tap(result => this.storeCrudData(result, route, key))
    );
  }

  storeCrudData(result: string | string[], route: string, key: string) {
    this.store.dispatch(crudActionCreators.entitiesFetched({ result, route, key }));
  }
}
