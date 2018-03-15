import { entityRepositoryActionCreators as actionCreators } from './entity-repository.actions';
import { EntityRepositoryState } from './entity-repository.interfaces';
import { entityRepositoryReducer } from './entity-repository.reducer';

describe('apiReducer', () => {
  let state: EntityRepositoryState<any>;

  describe('REPOSITORY_HAS_CHANGED', () => {
    it('should store entities', () => {
      const payload1 = {
        users: { a: 1, b: 2 }
      };

      const payload2 = {
        todos: { x: 'x', y: 'y' }
      };

      const payload3 = {
        users: { c: 3 }
      };

      // check initial state
      state = entityRepositoryReducer();
      expect(state).toEqual({});

      // first action
      state = entityRepositoryReducer(state, actionCreators.repositoryHasChanged(payload1));
      expect(state).toEqual(payload1);

      // sencond action adds new data
      state = entityRepositoryReducer(state, actionCreators.repositoryHasChanged(payload2));
      expect(state).toEqual({ ...payload1, ...payload2 });

      // third action replaces first data
      state = entityRepositoryReducer(state, actionCreators.repositoryHasChanged(payload3));
      expect(state).toEqual({
        users: { ...payload1.users, ...payload3.users },
        ...payload2
      });
    });
  });
});
