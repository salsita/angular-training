import { ActionCreatorFactory } from '@salsita/ngrx-helpers';
import { User } from '../users.interfaces';

const prefix = 'users';

export const usersActionTypes = {
  SAVE_USER: `${prefix}/save-user`
};

export const usersActionCreators = {
  saveUser: ActionCreatorFactory.create<User>(usersActionTypes.SAVE_USER)
};
