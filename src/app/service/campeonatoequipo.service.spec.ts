import { TestBed } from '@angular/core/testing';

import { CampeonatoequipoService } from './campeonatoequipo.service';

describe('CampeonatoequipoService', () => {
  let service: CampeonatoequipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampeonatoequipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
