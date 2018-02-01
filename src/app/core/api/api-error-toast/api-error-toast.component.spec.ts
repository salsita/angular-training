import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorToastComponent } from './api-error-toast.component';

describe('ApiErrorToastComponent', () => {
  let component: ApiErrorToastComponent;
  let fixture: ComponentFixture<ApiErrorToastComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApiErrorToastComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiErrorToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
