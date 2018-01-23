import { Store } from '@ngrx/store';

import { ApiStateRoot } from './api.interfaces';

export const getApi = (store: Store<ApiStateRoot>) => store.select('api');
export const getError = (store: Store<ApiStateRoot>) => getApi(store).select((state) => state.error ? state.error.type : null);
export const isLoading = (store: Store<ApiStateRoot>) => getApi(store).select(state => state.callsInProgress > 0);
