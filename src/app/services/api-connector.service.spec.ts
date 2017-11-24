import { TestBed, inject } from '@angular/core/testing';

import { ApiConnectorService } from './api-connector.service';

describe('ApiConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiConnectorService]
    });
  });

  it('should be created', inject([ApiConnectorService], (service: ApiConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
