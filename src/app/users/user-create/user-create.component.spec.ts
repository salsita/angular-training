import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { UsersSelectors } from '../+state/users.selectors';
import { UserCreateComponent } from './user-create.component';

const storeStub = {
  dispatch: () => {}
};

const usersSelectorsStub = {
  getSkills: () => {}
};

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UserCreateComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          { provide: UsersSelectors, useValue: usersSelectorsStub },
          { provide: Store, useValue: storeStub }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
