import { ApiState } from './core/api/api.interfaces';
import { CrudStateRoot } from './core/crud/crud.interfaces';
import { EntityRepositoryStateRoot } from './core/entity-repository/entity-repository.interfaces';
import { RouterState } from './core/router/router.interfaces';

export type AppState =
  ApiState &
  CrudStateRoot &
  EntityRepositoryStateRoot &
  RouterState;
