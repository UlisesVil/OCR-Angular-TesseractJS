import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOcrComponent } from './quick-ocr.component';

describe('QuickOcrComponent', () => {
  let component: QuickOcrComponent;
  let fixture: ComponentFixture<QuickOcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickOcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
