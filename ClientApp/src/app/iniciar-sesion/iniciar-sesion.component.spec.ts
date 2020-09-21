import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicarSesionComponent } from './inicar-sesion.component';

describe('InicarSesionComponent', () => {
  let component: InicarSesionComponent;
  let fixture: ComponentFixture<InicarSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicarSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
