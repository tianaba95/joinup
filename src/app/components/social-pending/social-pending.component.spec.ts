import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPendingComponent } from './social-pending.component';

describe('SocialPendingComponent', () => {
  let component: SocialPendingComponent;
  let fixture: ComponentFixture<SocialPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
