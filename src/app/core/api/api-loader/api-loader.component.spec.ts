import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ApiSelectors } from '../api.selectors';
import { ApiLoaderComponent } from './api-loader.component';

const apiSelectorsStub = {
  isLoading: () => {}
};

describe('ApiLoaderComponent', () => {
  let component: ApiLoaderComponent;
  let fixture: ComponentFixture<ApiLoaderComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApiLoaderComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ApiSelectors, useValue: apiSelectorsStub }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
