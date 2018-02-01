import { Injectable } from '@angular/core';

import { skillSchema } from '../+state/users.schema';
import { withLoadingIndicator } from '../../core/api/api.decorators';
import { CrudResolver } from '../../core/crud/crud.resolver';
import { CrudService } from '../../core/crud/crud.service';
import { RouterSelectors } from '../../core/router/router.selectors';
import { UsersApi } from '../users.api';

@Injectable()
export class SkillsResolver extends CrudResolver {
  schema = [skillSchema];
  route = 'users';
  key = 'skills';

  constructor(private api: UsersApi, crud: CrudService, routerSelectors: RouterSelectors) {
    super(crud, routerSelectors);
  }

  @withLoadingIndicator()
  data() {
    return this.api.getSkills();
  }
}
