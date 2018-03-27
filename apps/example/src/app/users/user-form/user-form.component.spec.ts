import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { skills, userDetail } from '../testing/user.selectors.mock';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [UserFormComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.skills = skills();
    component.user = userDetail();
    fixture.detectChanges();
  });

  it('should render user form', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should remove skill', () => {
    component.removeSkill(0);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should add skill', () => {
    component.addSkill();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
