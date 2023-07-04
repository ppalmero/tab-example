import { TestBed } from '@angular/core/testing';

import { FiltroPersonalizadoService } from './filtro-personalizado.service';

describe('FiltroPersonalizadoService', () => {
  let service: FiltroPersonalizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroPersonalizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
