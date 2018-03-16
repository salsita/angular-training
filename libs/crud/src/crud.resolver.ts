import { Resolve } from '@angular/router';
import { schema } from 'normalizr';
import { Observable } from 'rxjs/Observable';

import { FlatRouterStateSnapshot } from '../router/router.interfaces';
import { CrudService } from './crud.service';

export abstract class CrudResolver implements Resolve<string | string[]> {
  blocking = true;
  abstract schema: schema.Entity | schema.Entity[];
  abstract route: string;
  abstract key: string;

  constructor(private crud: CrudService) {}

  params(route: FlatRouterStateSnapshot): any[] {
    return [];
  }

  abstract data(...params: any[]): Observable<any>;

  resolve(): Observable<string[]> {
    return this.crud.resolve(this);
  }
}
