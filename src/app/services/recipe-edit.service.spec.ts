import { TestBed } from '@angular/core/testing';

import { RecipeEditService } from './recipe-edit.service';

describe('RecipeEditService', () => {
  let service: RecipeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
