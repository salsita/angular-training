import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { userSchema } from '../+state/users.schema';
import { CrudId } from '../../core/crud/crud.interfaces';
import { CrudResolver } from '../../core/crud/crud.resolver';
import { CrudService } from '../../core/crud/crud.service';
import { FlatRouterStateSnapshot } from '../../core/router/router.interfaces';
import { UsersApi } from '../users.api';

@Injectable()
export class UserDetailResolver extends CrudResolver {
  blocking = false;
  schema = userSchema;
  route = 'users/detail';
  key = 'user';

  constructor(private api: UsersApi, crud: CrudService, store: Store<any>) {
    super(crud, store);
  }

  params(route: FlatRouterStateSnapshot) {
    return [route.params.userId];
  }

  data(userId: CrudId) {
    return this.api.getUser(userId);
  }
}
