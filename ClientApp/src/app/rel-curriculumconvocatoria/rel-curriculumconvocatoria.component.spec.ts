import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelCurriculumconvocatoriaComponent } from './rel-curriculumconvocatoria.component';

describe('RelCurriculumconvocatoriaComponent', () => {
  let component: RelCurriculumconvocatoriaComponent;
  let fixture: ComponentFixture<RelCurriculumconvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelCurriculumconvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelCurriculumconvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
