import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noreaderGuard } from './noreader.guard';

describe('noreaderGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noreaderGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
