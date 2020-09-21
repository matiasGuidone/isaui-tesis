import { TestBed } from '@angular/core/testing';

import { AuthLoginService } from './authlogin.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthLoginService = TestBed.get(AuthLoginService);
    expect(service).toBeTruthy();
  });
});
