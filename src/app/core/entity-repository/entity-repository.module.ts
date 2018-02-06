import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  FEATURE_REDUCERS,
  STORE_FEATURES,
  StoreFeatureModule,
  _FEATURE_REDUCERS,
  combineReducers
} from '@ngrx/store';

import { EntityRepositoryModuleConfig } from './entity-repository.interfaces';
import { entityRepositoryInitialState, entityRepositoryReducer } from './entity-repository.reducer';
import { EntityRepositorySelectors } from './entity-repository.selectors';
import { EntityRepositoryService } from './entity-repository.service';
import { ENTITY_REPOSITORY_STORE_NAMESPACE } from './entity-repository.tokens';

@NgModule({
  imports: [StoreFeatureModule]
})
export class EntityRepositoryModule {
  static forRoot({ storeNamespace }: EntityRepositoryModuleConfig): ModuleWithProviders {
    return {
      ngModule: EntityRepositoryModule,
      providers: [
        EntityRepositorySelectors,
        EntityRepositoryService,
        {
          provide: ENTITY_REPOSITORY_STORE_NAMESPACE,
          useValue: storeNamespace
        },
        {
          provide: STORE_FEATURES,
          multi: true,
          useValue: {
            key: storeNamespace,
            reducerFactory: combineReducers,
            metaReducers: [],
            initialState: entityRepositoryInitialState
          }
        },
        {
          provide: _FEATURE_REDUCERS,
          multi: true,
          useValue: entityRepositoryReducer
        },
        {
          provide: FEATURE_REDUCERS,
          multi: true,
          useExisting: _FEATURE_REDUCERS
        }
      ]
    };
  }
}
