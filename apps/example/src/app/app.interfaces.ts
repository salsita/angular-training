import { ApiState } from '@angular-training-mono/api';
import { CrudState } from '@angular-training-mono/crud';
import { EntityRepositoryState } from '@angular-training-mono/entity-repository';
import { RouterState } from '@angular-training-mono/router';

export interface AppState {
  api: ApiState;
  crud: CrudState;
  entityRepository: EntityRepositoryState<any>;
  router: RouterState;
}
