import { Injectable } from '@angular/core';

import { skillSchema } from '../+state/users.schema';
import { withLoadingIndicator } from '../../core/api';
import { CrudResolver, CrudService } from '../../core/crud';
import { UsersApi } from '../users.api';

@Injectable()
export class SkillsResolver extends CrudResolver {
  schema = [skillSchema];
  route = 'users';
  key = 'skills';

  constructor(private api: UsersApi, crud: CrudService) {
    super(crud);
  }

  @withLoadingIndicator()
  data() {
    return this.api.getSkills();
  }
}
