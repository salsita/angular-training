import { Action } from '@ngrx/store';

export interface Handlers {
  [k: string]: Function;
}

export type reducerType<T> = (state: T, action?: Action) => T;
export const createReducer = <T, U extends Action>(handlers: Handlers, initialState: T) => (
  state: T = initialState,
  action?: U
): T => {
  const handler = action ? handlers[action.type] : null;
  return handler ? handler(state, action) : state;
};
