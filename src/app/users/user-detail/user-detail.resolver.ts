import { Injectable } from '@angular/core';

import { userSchema } from '../+state/users.schema';
import { CrudResolver, CrudService } from '../../core/crud';
import { FlatRouterStateSnapshot } from '../../core/router';
import { UsersApi } from '../users.api';

@Injectable()
export class UserDetailResolver extends CrudResolver {
  blocking = false;
  schema = userSchema;
  route = 'users/detail';
  key = 'user';

  constructor(private api: UsersApi, crud: CrudService) {
    super(crud);
  }

  params(route: FlatRouterStateSnapshot) {
    return [route.params.userId];
  }

  data(userId: string) {
    return this.api.getUser(userId);
  }
}
