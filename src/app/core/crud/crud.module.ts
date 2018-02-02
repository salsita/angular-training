import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { crudInitialState, crudReducer } from './crud.reducer';
import { CrudSelectors } from './crud.selectors';
import { CrudService } from './crud.service';

@NgModule({
  imports: [StoreModule.forFeature('crud', crudReducer, { initialState: crudInitialState })],
  providers: [CrudSelectors, CrudService]
})
export class CrudModule {}
