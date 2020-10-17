import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCurriculumComponent } from './abm-curriculum.component';

describe('AbmCurriculumComponent', () => {
  let component: AbmCurriculumComponent;
  let fixture: ComponentFixture<AbmCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
