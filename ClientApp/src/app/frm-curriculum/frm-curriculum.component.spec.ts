import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCurriculumComponent } from './frm-curriculum.component';

describe('FrmCurriculumComponent', () => {
  let component: FrmCurriculumComponent;
  let fixture: ComponentFixture<FrmCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
