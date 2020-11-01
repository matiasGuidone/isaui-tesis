import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmVercurriculumComponent } from './frm-vercurriculum.component';

describe('FrmVercurriculumComponent', () => {
  let component: FrmVercurriculumComponent;
  let fixture: ComponentFixture<FrmVercurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmVercurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmVercurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
