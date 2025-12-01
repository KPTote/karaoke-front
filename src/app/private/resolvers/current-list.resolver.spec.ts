import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { currentListResolver } from './current-list.resolver';

describe('currentListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => currentListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
