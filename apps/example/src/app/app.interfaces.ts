import { ApiState } from '@angular-training/api';
import { CrudState } from '@angular-training/crud';
import { EntityRepositoryState } from '@angular-training/entity-repository';
import { RouterState } from '@angular-training/router';

export interface AppState {
  api: ApiState;
  crud: CrudState;
  entityRepository: EntityRepositoryState<any>;
  router: RouterState;
}
