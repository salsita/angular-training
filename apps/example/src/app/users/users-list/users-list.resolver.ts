import { withLoadingIndicator } from '@angular-training-mono/api';
import { CrudResolver, CrudService } from '@angular-training-mono/crud';
import { Injectable } from '@angular/core';

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
