import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCalendarioComponent } from './frm-calendario.component';

describe('FrmCalendarioComponent', () => {
  let component: FrmCalendarioComponent;
  let fixture: ComponentFixture<FrmCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
