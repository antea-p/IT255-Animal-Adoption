import { TestBed } from '@angular/core/testing';

import { AdoptionGuard } from './adoption.guard';

describe('AdoptionGuard', () => {
  let guard: AdoptionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdoptionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
