import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmMensajesComponent } from './frm-mensajes.component';

describe('FrmMensajesComponent', () => {
  let component: FrmMensajesComponent;
  let fixture: ComponentFixture<FrmMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
