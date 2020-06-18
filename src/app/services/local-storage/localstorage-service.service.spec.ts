import { TestBed } from '@angular/core/testing';

import { ShoppingListService } from './localstorage-service.service';

describe('LocalstorageServiceService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
