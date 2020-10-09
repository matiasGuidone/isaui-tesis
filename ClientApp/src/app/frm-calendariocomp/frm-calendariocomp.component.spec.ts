import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCalendariocompComponent } from './frm-calendariocomp.component';

describe('FrmCalendariocompComponent', () => {
  let component: FrmCalendariocompComponent;
  let fixture: ComponentFixture<FrmCalendariocompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCalendariocompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCalendariocompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
