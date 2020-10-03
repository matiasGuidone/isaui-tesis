import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarganotadocenteComponent } from './carganotadocente.component';

describe('CarganotadocenteComponent', () => {
  let component: CarganotadocenteComponent;
  let fixture: ComponentFixture<CarganotadocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarganotadocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarganotadocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
