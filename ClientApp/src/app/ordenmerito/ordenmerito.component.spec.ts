import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenmeritoComponent } from './ordenmerito.component';

describe('OrdenmeritoComponent', () => {
  let component: OrdenmeritoComponent;
  let fixture: ComponentFixture<OrdenmeritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenmeritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenmeritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
