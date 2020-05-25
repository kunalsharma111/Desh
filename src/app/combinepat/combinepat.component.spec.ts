import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinepatComponent } from './combinepat.component';

describe('CombinepatComponent', () => {
  let component: CombinepatComponent;
  let fixture: ComponentFixture<CombinepatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinepatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinepatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
