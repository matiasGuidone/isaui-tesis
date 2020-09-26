import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMensajeComponent } from './abm-mensaje.component';

describe('AbmMensajeComponent', () => {
  let component: AbmMensajeComponent;
  let fixture: ComponentFixture<AbmMensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmMensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
