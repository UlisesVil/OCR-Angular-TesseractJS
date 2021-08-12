import { TestBed } from '@angular/core/testing';

import { RequestsOCRImagesService } from './requests-ocrimages.service';

describe('RequestsOCRImagesService', () => {
  let service: RequestsOCRImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsOCRImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
