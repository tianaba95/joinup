import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAsistentesComponent } from './plan-asistentes.component';

describe('PlanAsistentesComponent', () => {
  let component: PlanAsistentesComponent;
  let fixture: ComponentFixture<PlanAsistentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAsistentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAsistentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
