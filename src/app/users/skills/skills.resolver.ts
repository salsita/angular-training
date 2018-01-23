import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { skillSchema } from '../+state/users.schema';
import { withLodingIndicator } from '../../core/api/api.decorators';
import { CrudResolver } from '../../core/crud/crud.resolver';
import { CrudService } from '../../core/crud/crud.service';
import { UsersApi } from '../users.api';

@Injectable()
export class SkillsResolver extends CrudResolver {
  schema = [skillSchema];
  route = 'users';
  key = 'skills';

  constructor(private api: UsersApi, crud: CrudService, public store: Store<any>) {
    super(crud, store);
  }

  @withLodingIndicator()
  data() {
    return this.api.getSkills();
  }
}
