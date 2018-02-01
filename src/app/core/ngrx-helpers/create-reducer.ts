import { Action } from '@ngrx/store';

interface Handlers {
  [k: string]: Function;
}

export const createReducer = <T, U extends Action>(handlers: Handlers, initialState: T) => (
  state: T = initialState,
  action: U
): T => {
  const handler = handlers[action && action.type];
  return handler ? handler(state, action) : state;
};
