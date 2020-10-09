import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmAsistenciasalumnoComponent } from './frm-asistenciasalumno.component';

describe('FrmAsistenciasalumnoComponent', () => {
  let component: FrmAsistenciasalumnoComponent;
  let fixture: ComponentFixture<FrmAsistenciasalumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmAsistenciasalumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmAsistenciasalumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
