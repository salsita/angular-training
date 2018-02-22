import { ApiState } from './core/api';
import { CrudState } from './core/crud';
import { EntityRepositoryState } from './core/entity-repository';
import { RouterState } from './core/router';

export interface AppState {
  api: ApiState;
  crud: CrudState;
  entityRepository: EntityRepositoryState<any>;
  router: RouterState;
}
