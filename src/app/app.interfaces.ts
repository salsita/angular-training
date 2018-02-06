import { ApiStateRoot } from './core/api';
import { CrudStateRoot } from './core/crud';
import { EntityRepositoryStateRoot } from './core/entity-repository';
import { RouterState } from './core/router';

export type AppState = ApiStateRoot & CrudStateRoot & EntityRepositoryStateRoot & RouterState;
