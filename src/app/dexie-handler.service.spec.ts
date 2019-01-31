import { TestBed } from '@angular/core/testing';

import { DexieHandlerService } from './dexie-handler.service';

describe('DexieHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DexieHandlerService = TestBed.get(DexieHandlerService);
    expect(service).toBeTruthy();
  });
});
