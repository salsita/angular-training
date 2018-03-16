import { crudActionCreators } from './crud.actions';
import { CrudState, EntitiesFetchedPayload } from './crud.interfaces';
import { crudReducer } from './crud.reducer';

describe('apiReducer', () => {
  let state: CrudState;

  describe('ENTITIES_FETCHED', () => {
    it('should store entities', () => {
      const payload1: EntitiesFetchedPayload = {
        route: 'route',
        key: 'key',
        result: ['a', 'b']
      };

      const payload2: EntitiesFetchedPayload = {
        route: 'otherRoute',
        key: 'key',
        result: ['1']
      };

      const payload3: EntitiesFetchedPayload = {
        ...payload1,
        result: ['c']
      };

      // check initial state
      state = crudReducer();
      expect(state).toEqual({});

      // first action
      state = crudReducer(state, crudActionCreators.entitiesFetched(payload1));
      expect(state[payload1.route][payload1.key]).toBe(payload1.result);

      // sencond action adds new data
      // third action replaces first data
      state = crudReducer(state, crudActionCreators.entitiesFetched(payload2));
      state = crudReducer(state, crudActionCreators.entitiesFetched(payload3));
      expect(state[payload2.route][payload2.key]).toBe(payload2.result);
      expect(state[payload1.route][payload1.key]).toBe(payload3.result);
    });
  });
});
