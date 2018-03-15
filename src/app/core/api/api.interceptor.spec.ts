import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { apiActionCreators } from './api.actions';
import { BusinessValidationError } from './api.errors';
import { APIInterceptor, API_BASE_URL } from './api.interceptor';

describe('APIInterceptor', () => {
  let service: APIInterceptor;
  const store = { dispatch: jest.fn() };

  let clonedReq: HttpRequest<any>;
  let fakeResponse: Observable<any>;
  const httpHandler = {
    handle: jest.fn(req => {
      clonedReq = req;
      return fakeResponse;
    })
  };

  const requestWithHost = new HttpRequest('GET', 'http://somedomain.com/path');
  const requestWithoutHost = new HttpRequest('GET', '/path');

  const setupTest = (baseUrl: string, response: Observable<any>) => {
    fakeResponse = response;

    TestBed.configureTestingModule({
      providers: [
        APIInterceptor,
        {
          provide: API_BASE_URL,
          useValue: baseUrl
        },
        {
          provide: Store,
          useValue: store
        },
        {
          provide: HttpHandler,
          useValue: httpHandler
        }
      ]
    });

    service = TestBed.get(APIInterceptor);
  };

  Object.entries({
    'with baseUrl': 'http://localhost:3000',
    'without baseUrl': ''
  }).map(([description, baseUrl]) => {
    it(`should not change URL ${description}`, () => {
      // APIInterceptor should succeed when
      const data = { name: 'John Doe' };
      setupTest(baseUrl, of(data));

      service.intercept(requestWithHost, httpHandler);
      expect(httpHandler.handle).toHaveBeenLastCalledWith(clonedReq);
      expect(clonedReq.url).toBe(requestWithHost.url);
    });

    it(`should change URL ${description}`, () => {
      const data = { name: 'John Doe' };
      setupTest(baseUrl, of(data));

      service.intercept(requestWithoutHost, httpHandler);
      expect(httpHandler.handle).toHaveBeenLastCalledWith(clonedReq);
      expect(clonedReq.url.startsWith(baseUrl)).toBe(true);
    });
  });

  it('should fail', async () => {
    expect.assertions(2);

    // APIInterceptor should return Observable with an error
    // when request fails with unknown error
    const error = new Error('message');
    setupTest('', _throw(error));

    try {
      await service.intercept(requestWithoutHost, httpHandler).toPromise();
    } catch (err) {
      expect(err).toBe(error);
      expect(store.dispatch).not.toHaveBeenCalled();
    }
  });

  it('should fail and store error', async () => {
    expect.assertions(2);

    // APIInterceptor should return Observable with an error
    // and dispatch that error when request fails with `instanceof ApiError`
    const error = new BusinessValidationError('message');
    setupTest('', _throw(error));

    try {
      await service.intercept(requestWithoutHost, httpHandler).toPromise();
    } catch (err) {
      expect(err).toBe(error);
      expect(store.dispatch).toHaveBeenCalledWith(
        apiActionCreators.apiError({
          type: error.getType(),
          reason: error.getReason()
        })
      );
    }
  });
});
