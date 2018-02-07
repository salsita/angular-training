import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { UsersSelectors } from '../+state/users.selectors';
import { UserDetailComponent } from './user-detail.component';

const storeStub = {
  dispatch: () => {}
};

const usersSelectorsStub = {
  getUserDetail: () => {},
  getSkills: () => {}
};

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UserDetailComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: UsersSelectors, useValue: usersSelectorsStub },
          { provide: Store, useValue: storeStub }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
