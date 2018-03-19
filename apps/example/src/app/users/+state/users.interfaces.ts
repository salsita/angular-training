import { CrudState } from '@angular-training-mono/crud';

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
