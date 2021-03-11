import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmAsistenciasestudianteComponent } from './frm-asistenciasestudiante.component';

describe('FrmAsistenciasestudianteComponent', () => {
  let component: FrmAsistenciasestudianteComponent;
  let fixture: ComponentFixture<FrmAsistenciasestudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmAsistenciasestudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmAsistenciasestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
