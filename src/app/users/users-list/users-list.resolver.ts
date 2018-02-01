import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { userSchema } from '../+state/users.schema';
import { withLoadingIndicator } from '../../core/api/api.decorators';
import { CrudResolver } from '../../core/crud/crud.resolver';
import { CrudService } from '../../core/crud/crud.service';
import { UsersApi } from '../users.api';

@Injectable()
export class UsersListResolver extends CrudResolver {
  schema = [userSchema];
  route = 'users/list';
  key = 'users';

  constructor(private api: UsersApi, crud: CrudService, store: Store<any>) {
    super(crud, store);
  }

  @withLoadingIndicator()
  data() {
    return this.api.getUsers();
  }
}
