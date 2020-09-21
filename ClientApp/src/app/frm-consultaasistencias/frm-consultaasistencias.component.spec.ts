import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmConsultaasistenciasComponent } from './frm-consultaasistencias.component';

describe('FrmConsultaasistenciasComponent', () => {
  let component: FrmConsultaasistenciasComponent;
  let fixture: ComponentFixture<FrmConsultaasistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmConsultaasistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmConsultaasistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
