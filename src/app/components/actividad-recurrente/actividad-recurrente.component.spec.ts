import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRecurrenteComponent } from './actividad-recurrente.component';

describe('ActividadRecurrenteComponent', () => {
  let component: ActividadRecurrenteComponent;
  let fixture: ComponentFixture<ActividadRecurrenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadRecurrenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadRecurrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
