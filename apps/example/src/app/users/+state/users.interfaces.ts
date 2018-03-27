import { CrudState } from '@angular-training/crud';

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
