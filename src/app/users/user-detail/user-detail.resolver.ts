import { Injectable } from '@angular/core';

import { userSchema } from '../+state/users.schema';
import { CrudResolver } from '../../core/crud/crud.resolver';
import { CrudService } from '../../core/crud/crud.service';
import { FlatRouterStateSnapshot } from '../../core/router/router.interfaces';
import { RouterSelectors } from '../../core/router/router.selectors';
import { UsersApi } from '../users.api';

@Injectable()
export class UserDetailResolver extends CrudResolver {
  blocking = false;
  schema = userSchema;
  route = 'users/detail';
  key = 'user';

  constructor(private api: UsersApi, crud: CrudService, routerSelectors: RouterSelectors) {
    super(crud, routerSelectors);
  }

  params(route: FlatRouterStateSnapshot) {
    return [route.params.userId];
  }

  data(userId: string) {
    return this.api.getUser(userId);
  }
}
