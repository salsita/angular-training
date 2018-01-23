import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLoaderComponent } from './api-loader.component';

describe('ApiLoaderComponent', () => {
  let component: ApiLoaderComponent;
  let fixture: ComponentFixture<ApiLoaderComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ApiLoaderComponent]
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
