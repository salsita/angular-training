import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { apiCall, withLoadingIndicator } from './api.decorators';
import { API_VALIDATION_ERROR, ApiError, NETWORK_ERROR, UNKNOWN_API_ERROR } from './api.errors';
import { ApiService } from './api.service';
import { HTTP_CONFLICT } from './api.status-codes';

describe('API decorators', () => {
  const globalResponseData = { name: 'John Doe' };
  const globalResponse = of(globalResponseData);

  class TestApiService {
    @apiCall()
    apiCall() {
      return globalResponse;
    }

    @apiCall()
    apiCallWithError(error: { response: { data: any; status: number } | null; message: string }) {
      return _throw(error);
    }

    @withLoadingIndicator()
    withLoadingIndicator() {
      return globalResponse;
    }
  }

  const service = new TestApiService();

  describe('apiCall', () => {
    it('should succeed', async () => {
      const responseData = await service.apiCall().toPromise();
      expect(responseData).toBe(globalResponseData);
    });

    it('should fail with API_VALIDATION_ERROR', async () => {
      expect.assertions(3);

      const error = {
        response: { data: 1, status: HTTP_CONFLICT },
        message: 'message'
      };

      try {
        await service.apiCallWithError(error).toPromise();
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).getType()).toBe(API_VALIDATION_ERROR);
        expect((err as ApiError).getReason()).toBe(error.response.data);
      }
    });

    it('should fail with UNKNOWN_API_ERROR', async () => {
      expect.assertions(3);

      const error = {
        response: { data: 1, status: -1 },
        message: 'message'
      };

      try {
        await service.apiCallWithError(error).toPromise();
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).getType()).toBe(UNKNOWN_API_ERROR);
        expect((err as ApiError).getReason()).toBe(error.response.data);
      }
    });

    it('should fail with NETWORK_ERROR', async () => {
      expect.assertions(3);

      const error = {
        response: null,
        message: 'message'
      };

      try {
        await service.apiCallWithError(error).toPromise();
      } catch (err) {
        expect(err).toBeInstanceOf(ApiError);
        expect((err as ApiError).getType()).toBe(NETWORK_ERROR);
        expect((err as ApiError).getReason()).toBe(error.message);
      }
    });
  });

  describe('withLoadingIndicator', () => {
    beforeAll(() => {
      jest.spyOn(ApiService, 'startLoading');
    });

    afterAll(() => {
      ApiService.startLoading.mockRestore();
    });

    it('should call ApiService.startLoading', async () => {
      await service.withLoadingIndicator().toPromise();
      expect(ApiService.startLoading).toHaveBeenCalledWith(globalResponse);
    });
  });
});
