import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MockApiSelectors {
  subjects = {
    getError: new BehaviorSubject<string | null>(null),
    isLoading: new BehaviorSubject(false)
  };

  getError() {
    return this.subjects.getError.asObservable();
  }

  isLoading() {
    return this.subjects.isLoading.asObservable();
  }
}
