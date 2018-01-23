import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators/switchMap';

import { AppState } from '../../app.interfaces';
import { withLodingIndicator } from '../../core/api/api.decorators';
import { UsersListResolver } from '../users-list/users-list.resolver';
import { UsersApi } from '../users.api';
import { User } from '../users.interfaces';
import { usersActionTypes } from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    public store: Store<AppState>,
    private actions$: Actions<any>,
    private router: Router,
    private api: UsersApi,
    private usersListResolver: UsersListResolver
  ) {}

  @Effect({ dispatch: false })
  save$ = this.actions$
    .ofType(usersActionTypes.SAVE_USER)
    .pipe(
      switchMap(({ payload: user }: { payload: User }) => this.saveUser(user)),
      switchMap(() => this.usersListResolver.resolve()),
      switchMap(() => this.router.navigate(['/users']))
    );

  @withLodingIndicator()
  saveUser(user) {
    return this.api.saveUser(user);
  }
}
