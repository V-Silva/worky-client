import { TestBed, inject } from '@angular/core/testing';
import { AuthHandlerService } from './auth-handler.service';

describe('AuthHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHandlerService]
    });
  });

  it('should be created', inject([AuthHandlerService], (service: AuthHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
