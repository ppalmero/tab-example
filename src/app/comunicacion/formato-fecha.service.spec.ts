import { TestBed } from '@angular/core/testing';

import { FormatoFechaService } from './formato-fecha.service';

describe('FormatoFechaService', () => {
  let service: FormatoFechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatoFechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
