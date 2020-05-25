import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensiveComponent } from './expensive.component';

describe('ExpensiveComponent', () => {
  let component: ExpensiveComponent;
  let fixture: ComponentFixture<ExpensiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
