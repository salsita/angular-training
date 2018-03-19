import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApiSelectors } from '@angular-training-mono/api';
// tslint:disable-next-line nx-enforce-module-boundaries
import { MockApiSelectors } from '@angular-training-mono/api/testing';
import { ApiLoaderComponent } from './api-loader.component';

describe('ApiLoaderComponent', () => {
  let fixture: ComponentFixture<ApiLoaderComponent>;
  let selectors: MockApiSelectors;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApiLoaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ApiSelectors, useClass: MockApiSelectors }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLoaderComponent);
    selectors = TestBed.get(ApiSelectors);
  });

  it('should render disabled loader by', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render enabled loader', () => {
    selectors.subjects.isLoading.next(true);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
