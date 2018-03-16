import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { UsersEffects } from './+state/users.effects';
import { UsersSelectors } from './+state/users.selectors';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersApi } from './users.api';

@NgModule({
  imports: [UsersRoutingModule, EffectsModule.forFeature([UsersEffects]), SharedModule],
  declarations: [UsersListComponent, UserDetailComponent, UserFormComponent, UserCreateComponent],
  providers: [UsersApi, UsersEffects, UsersSelectors]
})
export class UsersModule {}
