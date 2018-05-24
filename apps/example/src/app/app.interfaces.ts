import { ApiState } from '@salsita/ng-api';
import { CrudState } from '@salsita/ng-crud';
import { EntityRepositoryState } from '@salsita/ng-entities';
import { RouterState } from '@salsita/ng-router';

export interface AppState {
  api: ApiState;
  crud: CrudState;
  entityRepository: EntityRepositoryState<any>;
  router: RouterState;
}
