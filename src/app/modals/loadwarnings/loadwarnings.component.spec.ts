import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadwarningsComponent } from './loadwarnings.component';

describe('LoadwarningsComponent', () => {
  let component: LoadwarningsComponent;
  let fixture: ComponentFixture<LoadwarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadwarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadwarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
