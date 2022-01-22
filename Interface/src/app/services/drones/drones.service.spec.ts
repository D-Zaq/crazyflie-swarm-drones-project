import { TestBed } from '@angular/core/testing';

import { DronesService } from './drones.service';

describe('DronesService', () => {
  let service: DronesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DronesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
