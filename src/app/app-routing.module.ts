import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => UsersModule
  },
  { path: '**', redirectTo: '/users' }
];

const routerOptions: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
