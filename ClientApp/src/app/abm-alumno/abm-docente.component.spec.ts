import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmDocenteComponent } from './abm-alumno.component';

describe('AbmDocenteComponent', () => {
  let component: AbmDocenteComponent;
  let fixture: ComponentFixture<AbmDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
