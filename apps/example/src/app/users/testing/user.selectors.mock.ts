import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Skill, User } from '../users.interfaces';

const skill1 = (): Skill => ({ id: '1', skill: 'JavaScript' });
const skill2 = (): Skill => ({ id: '2', skill: 'PostgreSQL' });

const user1 = (): User => ({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.nodomain',
  skills: [{ skill: skill2() }, { skill: skill1() }]
});

const user2 = (): User => ({
  id: '2',
  firstName: 'John',
  lastName: 'Stiles',
  email: 'john@stiles.nodomain',
  skills: [{ skill: skill2() }]
});

export const skills = () => [skill1(), skill2()];
export const userList = () => [user1(), user2()];
export const userDetail = () => user1();

@Injectable()
export class MockUsersSelectors {
  subjects = {
    getSkills: new BehaviorSubject(skills()),
    getUsersList: new BehaviorSubject(userList()),
    getUserDetail: new BehaviorSubject(userDetail())
  };

  getSkills() {
    return this.subjects.getSkills.asObservable();
  }

  getUsersList() {
    return this.subjects.getUsersList.asObservable();
  }

  getUserDetail() {
    return this.subjects.getUserDetail.asObservable();
  }
}
