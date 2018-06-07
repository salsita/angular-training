import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { usersActionCreators } from '../+state/users.actions';
import { UsersSelectors } from '../+state/users.selectors';
import { Skill, User } from '../users.interfaces';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {
  skills$: Observable<Skill[]>;
  user$: Observable<User | null>;

  constructor(private store: Store<any>, usersSelectors: UsersSelectors) {
    this.user$ = usersSelectors.getUserDetail();
    this.skills$ = usersSelectors.getSkills();
  }

  onSave(user: User) {
    this.store.dispatch(usersActionCreators.saveUser(user));
  }
}
