import { CrudState } from '../../core/crud/crud.interfaces';

export interface UsersCrudState extends CrudState {
  users: {
    skills: string[];
  };
  'users/list': {
    users: string[];
  };
  'users/detail': {
    user: string;
  };
}
