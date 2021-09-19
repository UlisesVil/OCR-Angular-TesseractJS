import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrloadingComponent } from './ocrloading.component';

describe('OcrloadingComponent', () => {
  let component: OcrloadingComponent;
  let fixture: ComponentFixture<OcrloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
