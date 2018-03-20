import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';

import { entityRepositoryActionCreators } from './entity-repository.actions';
import { EntityRepositoryService } from './entity-repository.service';

describe('EntityRepositoryService', () => {
  let service: EntityRepositoryService;
  const store = { dispatch: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EntityRepositoryService,
        {
          provide: Store,
          useValue: store
        }
      ]
    });

    service = TestBed.get(EntityRepositoryService);
  });

  describe('normalizeAndStore', () => {
    it('should dispatch action', () => {
      const data = { id: '1', name: 'John Doe' };
      const entityName = 'user';
      const entity = new schema.Entity(entityName);
      const result = service.normalizeAndStore(data, entity);

      expect(result).toBe(data.id);
      expect(store.dispatch).toHaveBeenCalledWith(
        entityRepositoryActionCreators.repositoryHasChanged({
          [entityName]: {
            [data.id]: data
          }
        })
      );
    });
  });
});
