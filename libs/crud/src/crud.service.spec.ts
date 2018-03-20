import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';
import { of } from 'rxjs/observable/of';

import { EntityRepositoryService } from '@angular-training/entity-repository';
import { RouterSelectors } from '@angular-training/router';
import { MockRouterSelectors } from '@angular-training/router/testing';
import { crudActionCreators } from './crud.actions';
import { CrudResolver } from './crud.resolver';
import { CrudService } from './crud.service';

describe('CrudService', () => {
  let service: CrudService;
  let selectors: MockRouterSelectors;
  const store = { dispatch: jest.fn() };
  const repo = { normalizeAndStore: jest.fn() };

  const data = { name: 'John Doe' };
  const entity = new schema.Entity('users');
  const route = 'route';
  const key = 'key';
  const result = 'id';
  const fakeReq = of(data);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CrudService,
        {
          provide: Store,
          useValue: store
        },
        {
          provide: EntityRepositoryService,
          useValue: repo
        },
        {
          provide: RouterSelectors,
          useClass: MockRouterSelectors
        }
      ]
    });

    service = TestBed.get(CrudService);
    selectors = TestBed.get(RouterSelectors);
  });

  describe('handleRequest', () => {
    it('should call services to store data', () => {
      jest.spyOn(service, 'storeCrudData');
      repo.normalizeAndStore.mockReturnValue(result);

      const pipedReq = service.handleRequest(fakeReq, entity, route, key);
      pipedReq.subscribe();

      expect(repo.normalizeAndStore).toHaveBeenCalledWith(data, entity);
      expect(service.storeCrudData).toHaveBeenCalledWith(route, key, result);
    });
  });

  describe('storeCrudData', () => {
    it('should dispatch action', () => {
      service.storeCrudData(route, key, result);
      expect(store.dispatch).toHaveBeenCalledWith(
        crudActionCreators.entitiesFetched({ route, key, result })
      );
    });
  });

  describe('resolve', () => {
    const params = [1];
    class TestResolver extends CrudResolver {
      route = route;
      key = key;
      schema = entity;

      data() {
        return of(data);
      }
    }

    it('should call handleRequest', () => {
      jest.spyOn(service, 'handleRequest');

      const resolver = new TestResolver(service);
      resolver.params = jest.fn(() => params);
      resolver.data = jest.fn(() => of(data));

      service.resolve(resolver).subscribe();

      expect(resolver.params).toHaveBeenCalledWith(selectors.subjects.getFlatRouterState.value);
      expect(resolver.data).toHaveBeenCalledWith(...params);
      expect(service.handleRequest).toHaveBeenCalledWith(fakeReq, entity, route, key);
    });
  });
});
