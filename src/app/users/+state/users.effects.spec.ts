import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from '@nrwl/nx/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UsersListResolver } from '../users-list/users-list.resolver';
import { UsersApi } from '../users.api';
import { usersActionCreators } from './users.actions';
import { UsersEffects } from './users.effects';

const usersApiStub = {};
const routerStub = {
  navigate: jest.fn(() => Promise.resolve())
};

const usersListResolverStub = {
  resolve: jest.fn(() => Promise.resolve())
};

describe('UsersEffects', () => {
  let actions: Observable<any> = of();
  let effects: UsersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        provideMockActions(() => actions),
        UsersEffects,
        { provide: UsersApi, useValue: usersApiStub },
        { provide: Router, useValue: routerStub },
        { provide: UsersListResolver, useValue: usersListResolverStub }
      ]
    });

    effects = TestBed.get(UsersEffects);
  });

  describe('save$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: usersActionCreators.saveUser() });

      effects.saveUser = jest.fn(() => Promise.resolve());
      effects.save$.subscribe(() => {
        expect(effects.saveUser).toHaveBeenCalled();
      });
    });
  });
});
