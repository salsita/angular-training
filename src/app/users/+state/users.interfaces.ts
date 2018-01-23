import { CrudId, CrudState } from '../../core/crud/crud.interfaces';

export interface UsersCrudState extends CrudState {
  users: {
    skills: CrudId[];
  };
  'users/list': {
    users: CrudId[];
  };
  'users/detail': {
    user: CrudId;
  };
}
