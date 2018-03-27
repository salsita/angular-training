import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import { apiActionCreators } from './api.actions';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const store = { dispatch: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {
          provide: Store,
          useValue: store
        }
      ]
    });

    service = TestBed.get(ApiService);
  });

  describe('startLoading', () => {
    it('should change loading state', async () => {
      const fakeReq = new Subject<void>();
      const fakeReqWithLoading = ApiService.startLoading(fakeReq);

      expect(store.dispatch).toHaveBeenCalledWith(apiActionCreators.startLoading());

      fakeReqWithLoading.subscribe();
      fakeReq.complete();

      // Wait for `stopLoading` action, it's delayed a bit
      await new Promise(process.nextTick);

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenLastCalledWith(apiActionCreators.stopLoading());
    });
  });
});
