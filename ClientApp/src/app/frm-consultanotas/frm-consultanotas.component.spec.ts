import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultanotasComponent } from './frm-consultanotas.component';

describe('ConsultanotasComponent', () => {
  let component: ConsultanotasComponent;
  let fixture: ComponentFixture<ConsultanotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultanotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultanotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
