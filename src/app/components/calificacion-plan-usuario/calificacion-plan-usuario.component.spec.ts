import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionPlanUsuarioComponent } from './calificacion-plan-usuario.component';

describe('CalificacionPlanUsuarioComponent', () => {
  let component: CalificacionPlanUsuarioComponent;
  let fixture: ComponentFixture<CalificacionPlanUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionPlanUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionPlanUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
