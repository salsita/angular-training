import { Action } from '@ngrx/store';

export const createReducer = <T, U extends Action>(handlers, initialState: T) => (
  state: T = initialState,
  action: U
): T => {
  const handler = handlers[action && action.type];
  return handler ? handler(state, action) : state;
};
