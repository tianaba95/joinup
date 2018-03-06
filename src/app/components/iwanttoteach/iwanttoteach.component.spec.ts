import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IwanttoteachComponent } from './iwanttoteach.component';

describe('IwanttoteachComponent', () => {
  let component: IwanttoteachComponent;
  let fixture: ComponentFixture<IwanttoteachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IwanttoteachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IwanttoteachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
