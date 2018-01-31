import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';

import { apiActionCreators } from './api.actions';
import { ApiError, BusinessValidationError, NETWORK_ERROR, UNKNOWN_API_ERROR } from './api.errors';
import { HTTP_CONFLICT } from './api.status-codes';

export const apiCall = <T>() => {
  return (target: T, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const oldFn = descriptor.value;

    descriptor.value = function(...args: any[]) {
      return oldFn.apply(this, args).pipe(
        catchError(({ response, message }) => {
          if (response) {
            const { data, status } = response;
            // Deal with all the possible statuses here
            // most likely just adding a case is good enough
            switch (status) {
              case HTTP_CONFLICT:
                throw new BusinessValidationError(data);

              default:
                // all the statuses should be defaulted to unknown generic api error
                throw new ApiError(UNKNOWN_API_ERROR, data);
            }
          } else {
            // If there is no response, it's considered a network problem
            throw new ApiError(NETWORK_ERROR, message);
          }
        })
      );
    };
  };
};

interface HasStore {
  store: Store<any>;
}

export const withLodingIndicator = () => {
  return (target: HasStore, propertyKey: string, descriptor: PropertyDescriptor): void => {
    const oldFn = descriptor.value;

    descriptor.value = function(...args: any[]) {
      this.store.dispatch(apiActionCreators.startLoading());
      return oldFn
        .apply(this, args)
        .pipe(tap(() => this.store.dispatch(apiActionCreators.stopLoading())));
    };
  };
};
