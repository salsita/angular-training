import { Injectable } from '@angular/core';

import { userSchema } from '../+state/users.schema';
import { withLoadingIndicator } from '../../core/api';
import { CrudResolver, CrudService } from '../../core/crud';
import { RouterSelectors } from '../../core/router';
import { UsersApi } from '../users.api';

@Injectable()
export class UsersListResolver extends CrudResolver {
  schema = [userSchema];
  route = 'users/list';
  key = 'users';

  constructor(private api: UsersApi, crud: CrudService, routerSelectors: RouterSelectors) {
    super(crud, routerSelectors);
  }

  @withLoadingIndicator()
  data() {
    return this.api.getUsers();
  }
}
