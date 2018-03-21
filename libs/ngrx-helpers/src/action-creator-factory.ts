/* Action Creator Factory
 * ======================
 * Creates typed action creators functions
 * const addTodo = ActionCreatorFactory.create<string>('ADD_TODO')
 *
 **/
export class Action<T> {
  constructor(public type: string, public payload: T | null = null) {}
}

export type actionCreator<T> = (payload?: T) => Action<T>;

// @dynamic
export class ActionCreatorFactory {
  static create<T>(type: string, defaultPayloadValue?: any): actionCreator<T> {
    return (payload?: T): Action<T> => {
      return new Action<T>(type, payload || defaultPayloadValue);
    };
  }
}
