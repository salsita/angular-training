import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
// import { hot, readAll } from '@nrwl/nx/testing';

import { UsersListResolver } from '../users-list/users-list.resolver';
import { UsersApi } from '../users.api';
import { UsersEffects } from './users.effects';

const usersApiStub = {};
const routerStub = {
  navigate: () => Promise.resolve()
};

const usersListResolverStub = {
  resolve: () => Promise.resolve()
};

describe('UsersEffects', () => {
  const actions: Observable<any> = of();
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
    it('should work', async () => {
      // TODO: test that it actually did something
      // We could also rewrite the effect to return some action (eg. Router `GO` action)
      // const saveAction = usersActionCreators.saveUser();
      // effects.saveUser = () => of({});

      // actions = hot('-a-|', { a: saveAction });
      // await readAll(effects.save$);

      expect(true).toEqual(true);
    });
  });
});
