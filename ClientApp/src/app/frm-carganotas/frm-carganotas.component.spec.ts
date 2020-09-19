import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCarganotasComponent } from './frm-carganotas.component';

describe('FrmCarganotasComponent', () => {
  let component: FrmCarganotasComponent;
  let fixture: ComponentFixture<FrmCarganotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCarganotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCarganotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
