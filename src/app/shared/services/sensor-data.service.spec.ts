import { TestBed } from '@angular/core/testing';

import { SensorDataServiceService } from './sensor-data.service';

describe('CollectDataServiceService', () => {
  let service: SensorDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
