import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@salsita/ngrx-helpers/testing';

import { UsersSelectors } from '../+state/users.selectors';
import { MockUsersSelectors } from '../testing';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UserDetailComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: UsersSelectors, useClass: MockUsersSelectors },
          { provide: Store, useValue: MockStore }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    fixture.detectChanges();
  });

  it('should render user form', () => {
    expect(fixture).toMatchSnapshot();
  });
});
