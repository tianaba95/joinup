import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoActividadSocialComponent } from './tipo-actividad-social.component';

describe('TipoActividadSocialComponent', () => {
  let component: TipoActividadSocialComponent;
  let fixture: ComponentFixture<TipoActividadSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoActividadSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoActividadSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
