import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RandomNumberGeneratorService } from './random-number-generator.service';

describe('RandomNumberGeneratorService', () => {
  let service: RandomNumberGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RandomNumberGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
