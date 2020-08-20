import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAsistenciaComponent } from './abm-asistencia.component';

describe('AbmAsistenciaComponent', () => {
  let component: AbmAsistenciaComponent;
  let fixture: ComponentFixture<AbmAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
