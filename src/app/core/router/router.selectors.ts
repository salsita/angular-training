import { Store } from '@ngrx/store';
import { RouterStateRoot } from './router.interfaces';

export const getRouterState = (store: Store<RouterStateRoot>) => store.select('router');
export const getFlatRouterState = (store: Store<RouterStateRoot>) => getRouterState(store).select('state');
