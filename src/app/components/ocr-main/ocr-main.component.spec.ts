import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrMainComponent } from './ocr-main.component';

describe('OcrMainComponent', () => {
  let component: OcrMainComponent;
  let fixture: ComponentFixture<OcrMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
