// tslint:disable-next-line nx-enforce-module-boundaries
import { MockStore } from '@angular-training/ngrx-helpers/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { UsersSelectors } from '../+state/users.selectors';
import { MockUsersSelectors } from '../testing';
import { UserCreateComponent } from './user-create.component';

describe('UserCreateComponent', () => {
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UserCreateComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: UsersSelectors, useClass: MockUsersSelectors },
          { provide: Store, useValue: MockStore }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    fixture.detectChanges();
  });

  it('should render user form', () => {
    expect(fixture).toMatchSnapshot();
  });
});
