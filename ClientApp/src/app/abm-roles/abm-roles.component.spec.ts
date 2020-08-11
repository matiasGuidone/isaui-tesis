import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmRolesComponent } from './abm-roles.component';

describe('AbmRolesComponent', () => {
  let component: AbmRolesComponent;
  let fixture: ComponentFixture<AbmRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
