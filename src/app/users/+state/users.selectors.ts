import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { CrudId } from './../../core/crud/crud.interfaces';

import { AppState } from '../../app.interfaces';
import { getEntityRepository } from '../../core/entity-repository/entity-repository.selectors';
import { User } from '../users.interfaces';
import { getCrud } from './../../core/crud/crud.selectors';
import { SingleEntityRepository } from './../../core/entity-repository/entity-repository.interfaces';
import { skillsEntity, usersEntity, usersSkillsEntity } from './users.entities';

export const getSkillsRepo = (store: Store<AppState>) => getEntityRepository(store).select(skillsEntity);
export const getUsersRepo = (store: Store<AppState>) =>
  combineLatest(
    getEntityRepository(store).select(state => state[usersEntity] ? state[usersEntity] : []),
    getEntityRepository(store).select(state => state[usersSkillsEntity] ? state[usersSkillsEntity] : []),
    getSkillsRepo(store),
    (users, usersSkills, skills): SingleEntityRepository<User>  => {
      return Object.entries(users).reduce((acc, [userId, user]) => ({
        ...acc,
        [userId]: {
          ...user,
          skills: user.skills
            .map(userSkillId => usersSkills[userSkillId] ? skills[usersSkills[userSkillId].skill] : null)
            .filter(Boolean)
        }
      }), {});
    }
  );

export const getSkills = (store: Store<AppState>) =>
  combineLatest(
    getSkillsRepo(store),
    getCrud(store).select('users').select('skills'),
    (skills, skillIds: CrudId[]) => skillIds.map(skillId => skills[skillId])
  );

export const getUsersList = (store: Store<AppState>) =>
  combineLatest(
    getUsersRepo(store),
    getCrud(store).select('users/list').select('users'),
    (users, usersList: CrudId[]) => usersList.map((userId) => users[userId])
  );

export const getUserDetail = (store: Store<AppState>) =>
  combineLatest(
    getUsersRepo(store),
    getCrud(store).select(state => state['users/detail'] && state['users/detail'].user ? state['users/detail'].user : null),
    (users, userId: CrudId) => userId ? users[userId] : null
  );
