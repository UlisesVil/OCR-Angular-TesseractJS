import { TestBed } from '@angular/core/testing';

import { MenusActivatorService } from './menus-activator.service';

describe('MenusActivatorService', () => {
  let service: MenusActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
