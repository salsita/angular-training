import { usersReducer } from './users.reducer';
import { usersInitialState } from './users.init';
import { Users } from './users.interfaces';
import { DataLoaded } from './users.actions';

describe('usersReducer', () => {
  it('should work', () => {
    const state: Users = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = usersReducer(state, action);
    expect(actual).toEqual({});
  });
});
