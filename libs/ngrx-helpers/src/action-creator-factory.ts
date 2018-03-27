import { Injectable } from '@angular/core';

/* Action Creator Factory
 * ======================
 * Creates typed action creators functions
 * const addTodo = ActionCreatorFactory.create<string>('ADD_TODO')
 *
 **/
export class ActionCreator<T> {
  constructor(public type: string = 'NOT_SET', public payload: T | null = null) {}
}
@Injectable()
export class ActionCreatorFactory {
  static create<T>(type: string, defaultPayloadValue: any = null) {
    return (payload: T | null = null): ActionCreator<any> => {
      const _payload = payload ? payload : defaultPayloadValue;
      return new ActionCreator<T>(type, _payload);
    };
  }

  create<T>(type: string, defaultPayloadValue: any = null) {
    return ActionCreatorFactory.create<T>(type, defaultPayloadValue);
  }
}
