import { TestBed } from '@angular/core/testing';

import { AutomaticoService } from './automatico.service';

describe('AutomaticoService', () => {
  let service: AutomaticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomaticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
