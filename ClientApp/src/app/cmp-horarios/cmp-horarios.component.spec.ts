import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpHorariosComponent } from './cmp-horarios.component';

describe('CmpHorariosComponent', () => {
  let component: CmpHorariosComponent;
  let fixture: ComponentFixture<CmpHorariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpHorariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
