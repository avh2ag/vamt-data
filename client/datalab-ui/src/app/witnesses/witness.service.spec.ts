import { TestBed, inject } from '@angular/core/testing';

import { WitnessService } from './witness.service';

describe('WitnessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WitnessService]
    });
  });

  it('should be created', inject([WitnessService], (service: WitnessService) => {
    expect(service).toBeTruthy();
  }));
});
