import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { newsResolver } from './news.resolver';
import { Articolo } from '../../core/models/articolo';

describe('newsResolver', () => {
  const executeResolver: ResolveFn<Articolo | null> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => newsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
