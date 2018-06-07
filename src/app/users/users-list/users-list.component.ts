import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UsersSelectors } from '../+state/users.selectors';
import { User } from '../users.interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  users$: Observable<User[]>;

  constructor(usersSelectors: UsersSelectors) {
    this.users$ = usersSelectors.getUsersList();
  }
}
