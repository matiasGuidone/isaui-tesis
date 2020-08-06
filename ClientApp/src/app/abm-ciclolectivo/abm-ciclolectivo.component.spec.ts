import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCiclolectivoComponent } from './abm-ciclolectivo.component';

describe('AbmCiclolectivoComponent', () => {
  let component: AbmCiclolectivoComponent;
  let fixture: ComponentFixture<AbmCiclolectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCiclolectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCiclolectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
