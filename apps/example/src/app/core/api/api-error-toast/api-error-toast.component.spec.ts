import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApiSelectors } from '@salsita/ng-api';
import { MockApiSelectors } from '@salsita/ng-api/testing';
import { ApiErrorToastComponent } from './api-error-toast.component';

describe('ApiErrorToastComponent', () => {
  let fixture: ComponentFixture<ApiErrorToastComponent>;
  let selectors: MockApiSelectors;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApiErrorToastComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ApiSelectors, useClass: MockApiSelectors }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiErrorToastComponent);
    selectors = TestBed.get(ApiSelectors);
  });

  it('should render no error by default', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render some error', () => {
    selectors.subjects.getError.next('Some error');
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
