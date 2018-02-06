import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { entityRepositoryInitialState, entityRepositoryReducer } from './entity-repository.reducer';
import { EntityRepositorySelectors } from './entity-repository.selectors';
import { EntityRepositoryService } from './entity-repository.service';

@NgModule({
  imports: [
    StoreModule.forFeature('entityRepository', entityRepositoryReducer, {
      initialState: entityRepositoryInitialState
    })
  ],
  providers: [EntityRepositorySelectors, EntityRepositoryService]
})
export class EntityRepositoryModule {}
