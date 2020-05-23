import { TestBed } from '@angular/core/testing';

import { SubsinkService } from './subsink.service';

describe('SubsinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubsinkService = TestBed.get(SubsinkService);
    expect(service).toBeTruthy();
  });
});
