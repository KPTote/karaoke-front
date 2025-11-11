import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { confirmationFormGuard } from './confirmation-form.guard';

describe('confirmationFormGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confirmationFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
