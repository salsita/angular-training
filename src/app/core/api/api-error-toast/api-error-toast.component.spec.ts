import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApiSelectors } from '../api.selectors';
import { ApiErrorToastComponent } from './api-error-toast.component';

const apiSelectorsStub = {
  getError: () => {}
};

describe('ApiErrorToastComponent', () => {
  let component: ApiErrorToastComponent;
  let fixture: ComponentFixture<ApiErrorToastComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApiErrorToastComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ApiSelectors, useValue: apiSelectorsStub }]
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
