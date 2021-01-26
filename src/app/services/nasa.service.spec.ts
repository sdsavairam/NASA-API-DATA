import { TestBed } from '@angular/core/testing';

import { NasaService } from './nasa.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { observable } from 'rxjs';

describe('NasaService', () => {
  let service: NasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
      ]
    });
    service = TestBed.inject(NasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http GET method when getNasaResult called', () => {
    service.getNasaResult('xyz');
  });
});
