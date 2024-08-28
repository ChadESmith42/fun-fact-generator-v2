import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { FactService } from './fact.service';

describe('FactService', () => {
  let service: FactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: HttpClientTestingModule},
      ]
    });
    service = TestBed.inject(FactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
