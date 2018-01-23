import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkillsResolver } from './skills/skills.resolver';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolver } from './user-detail/user-detail.resolver';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListResolver } from './users-list/users-list.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      skills: SkillsResolver
    },
    children: [
      {
        path: '',
        component: UsersListComponent,
        resolve: {
          users: UsersListResolver
        },
        children: [
          {
            path: 'create',
            component: UserCreateComponent
          }
        ]
      },
      {
        path: ':userId',
        component: UserDetailComponent,
        resolve: {
          user: UserDetailResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
