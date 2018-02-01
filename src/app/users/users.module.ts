import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { UsersEffects } from './+state/users.effects';
import { SkillsResolver } from './skills/skills.resolver';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolver } from './user-detail/user-detail.resolver';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListResolver } from './users-list/users-list.resolver';
import { UsersRoutingModule } from './users-routing.module';
import { UsersApi } from './users.api';

@NgModule({
  imports: [UsersRoutingModule, EffectsModule.forFeature([UsersEffects]), SharedModule],
  declarations: [UsersListComponent, UserDetailComponent, UserFormComponent, UserCreateComponent],
  providers: [UsersApi, UsersEffects, UsersListResolver, UserDetailResolver, SkillsResolver]
})
export class UsersModule {}
