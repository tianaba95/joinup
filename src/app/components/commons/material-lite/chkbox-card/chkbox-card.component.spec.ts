import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkboxCardComponent } from './chkbox-card.component';

describe('ChkboxCardComponent', () => {
  let component: ChkboxCardComponent;
  let fixture: ComponentFixture<ChkboxCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChkboxCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChkboxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
