import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMensajeComponent } from './ver-mensaje.component';

describe('VerMensajeComponent', () => {
  let component: VerMensajeComponent;
  let fixture: ComponentFixture<VerMensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
