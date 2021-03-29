import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmControlregularidadesComponent } from './frm-controlregularidades.component';

describe('FrmControlregularidadesComponent', () => {
  let component: FrmControlregularidadesComponent;
  let fixture: ComponentFixture<FrmControlregularidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmControlregularidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmControlregularidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
