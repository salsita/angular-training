import { CrudSelectors } from '@angular-training/crud';
import {
  EntityRepositorySelectors,
  SingleEntityRepository
} from '@angular-training/entity-repository';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { SkillsResolver } from '../skills/skills.resolver';
import { UserDetailResolver } from '../user-detail/user-detail.resolver';
import { UsersListResolver } from '../users-list/users-list.resolver';
import { User } from '../users.interfaces';
import { skillsEntity, usersEntity, usersSkillsEntity } from './users.entities';

@Injectable()
export class UsersSelectors {
  constructor(
    private entityRepositorySelectors: EntityRepositorySelectors,
    private crudSelectors: CrudSelectors,
    private usersListResolver: UsersListResolver,
    private userDetailResolver: UserDetailResolver,
    private skillsResolver: SkillsResolver
  ) {}

  private getCrud() {
    return this.crudSelectors.getCrud();
  }

  private getEntityRepository() {
    return this.entityRepositorySelectors.getEntityRepository();
  }

  private getSkillsRepo() {
    return this.getEntityRepository().select(skillsEntity);
  }

  private getUsersRepo() {
    return combineLatest(
      this.getEntityRepository().select(state => state[usersEntity] || []),
      this.getEntityRepository().select(state => state[usersSkillsEntity] || []),
      this.getSkillsRepo(),
      (users, usersSkills, skills): SingleEntityRepository<User> => {
        return Object.entries(users).reduce(
          (acc, [userId, user]) => ({
            ...acc,
            [userId]: {
              ...user,
              skills: user.skills
                .map(
                  (userSkillId: string) =>
                    usersSkills[userSkillId] ? skills[usersSkills[userSkillId].skill] : null
                )
                .filter(Boolean)
            }
          }),
          {}
        );
      }
    );
  }

  getSkills() {
    const crudRoute = this.skillsResolver.route;
    const crudRouteKey = this.skillsResolver.key;

    return combineLatest(
      this.getSkillsRepo(),
      this.getCrud()
        .select(crudRoute)
        .select(crudRouteKey),
      (skills, skillIds: string[]) => skillIds.map(skillId => skills[skillId])
    );
  }

  getUsersList() {
    const crudRoute = this.usersListResolver.route;
    const crudRouteKey = this.usersListResolver.key;

    return combineLatest(
      this.getUsersRepo(),
      this.getCrud()
        .select(crudRoute)
        .select(crudRouteKey),
      (users, usersList: string[]) => usersList.map(userId => users[userId])
    );
  }

  getUserDetail() {
    const crudRoute = this.userDetailResolver.route;
    const crudRouteKey = this.userDetailResolver.key;

    return combineLatest(
      this.getUsersRepo(),
      this.getCrud().select(state => (state[crudRoute] && state[crudRoute][crudRouteKey]) || null),
      (users, userId: string) => (userId ? users[userId] : null)
    );
  }
}
