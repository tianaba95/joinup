import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IwanttoteachFormComponent } from './iwanttoteach-form.component';

describe('IwanttoteachFormComponent', () => {
  let component: IwanttoteachFormComponent;
  let fixture: ComponentFixture<IwanttoteachFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IwanttoteachFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IwanttoteachFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
