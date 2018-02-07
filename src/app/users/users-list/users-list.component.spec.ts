import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { UsersSelectors } from '../+state/users.selectors';
import { UsersListComponent } from './users-list.component';

const usersSelectorsStub = {
  getUsersList: () => {}
};

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersListComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: UsersSelectors, useValue: usersSelectorsStub }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
