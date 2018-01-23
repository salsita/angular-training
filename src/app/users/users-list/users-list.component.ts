import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getUsersList } from '../+state/users.selectors';
import { AppState } from '../../app.interfaces';
import { User } from '../users.interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users$: Observable<User[]>;

  constructor(store: Store<AppState>) {
    this.users$ = getUsersList(store);
  }
}
