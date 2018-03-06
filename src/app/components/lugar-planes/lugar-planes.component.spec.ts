import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarPlanesComponent } from './lugar-planes.component';

describe('LugarPlanesComponent', () => {
  let component: LugarPlanesComponent;
  let fixture: ComponentFixture<LugarPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugarPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
