import { TestBed, inject } from '@angular/core/testing';

import { WantoteachService } from './wantoteach.service';

describe('WantoteachService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WantoteachService]
    });
  });

  it('should be created', inject([WantoteachService], (service: WantoteachService) => {
    expect(service).toBeTruthy();
  }));
});
