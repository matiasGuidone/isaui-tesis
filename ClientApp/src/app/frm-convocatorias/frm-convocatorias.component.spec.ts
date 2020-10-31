import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmConvocatoriasComponent } from './frm-convocatorias.component';

describe('FrmConvocatoriasComponent', () => {
  let component: FrmConvocatoriasComponent;
  let fixture: ComponentFixture<FrmConvocatoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmConvocatoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmConvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
