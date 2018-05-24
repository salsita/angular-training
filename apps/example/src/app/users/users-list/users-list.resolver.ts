import { Injectable } from '@angular/core';
import { withLoadingIndicator } from '@salsita/ng-api';
import { CrudResolver, CrudService } from '@salsita/ng-crud';

import { userSchema } from '../+state/users.schema';
import { UsersApi } from '../users.api';

@Injectable()
export class UsersListResolver extends CrudResolver {
  schema = [userSchema];
  route = 'users/list';
  key = 'users';

  constructor(private api: UsersApi, crud: CrudService) {
    super(crud);
  }

  @withLoadingIndicator()
  data() {
    return this.api.getUsers();
  }
}
