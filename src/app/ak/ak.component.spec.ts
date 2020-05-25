import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkComponent } from './ak.component';

describe('AkComponent', () => {
  let component: AkComponent;
  let fixture: ComponentFixture<AkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
