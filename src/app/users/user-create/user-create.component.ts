import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { usersActionCreators } from '../+state/users.actions';
import { getSkills } from '../+state/users.selectors';
import { Skill, User } from '../users.interfaces';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  skills$: Observable<Skill[]>;

  constructor(private store: Store<any>) {
    this.skills$ = getSkills(store);
  }

  createUser(user: User) {
    this.store.dispatch(usersActionCreators.saveUser(user));
  }
}