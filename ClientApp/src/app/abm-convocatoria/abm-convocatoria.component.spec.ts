import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmConvocatoriaComponent } from './abm-convocatoria.component';

describe('AbmConvocatoriaComponent', () => {
  let component: AbmConvocatoriaComponent;
  let fixture: ComponentFixture<AbmConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
