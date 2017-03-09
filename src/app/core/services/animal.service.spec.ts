import { TestBed, inject } from '@angular/core/testing';

import { AnimalService } from './animal.service';

describe('AnimalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalService]
    });
  });

  it('should ...', inject([AnimalService], (service: AnimalService) => {
    expect(service).toBeTruthy();
  }));
});
