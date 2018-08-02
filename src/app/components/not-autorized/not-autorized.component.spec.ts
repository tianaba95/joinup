import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAutorizedComponent } from './not-autorized.component';

describe('NotAutorizedComponent', () => {
  let component: NotAutorizedComponent;
  let fixture: ComponentFixture<NotAutorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAutorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAutorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
