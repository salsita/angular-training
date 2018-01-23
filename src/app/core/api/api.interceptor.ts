import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators/catchError';

import { apiActionCreators } from './api.actions';
import { ApiError } from './api.errors';

export const API_BASE_URL = new InjectionToken<string>('API baseURL');

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private store: Store<any>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const finalReq = this.baseUrl && !/^https?:\/\//i.test(req.url) ?
      req.clone({ url: `${this.baseUrl}${req.url}` }) :
      req;

    return next.handle(finalReq).pipe(
      catchError((err) => {
        if (err instanceof ApiError) {
          this.store.dispatch(
            apiActionCreators.apiError({
              type: err.getType(),
              reason: err.getReason()
            })
          );
        }

        return _throw(err);
      })
    );
  }
}
