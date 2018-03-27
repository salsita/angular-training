import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UsersSelectors } from '../+state/users.selectors';
import { MockUsersSelectors } from '../testing';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: UsersSelectors, useClass: MockUsersSelectors }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    fixture.detectChanges();
  });

  it('render list of users', () => {
    expect(fixture).toMatchSnapshot();
  });
});
