import { TestBed } from '@angular/core/testing';

import { RegistroHorasService } from './registro-horas.service';

describe('RegistroHorasService', () => {
  let service: RegistroHorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroHorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
