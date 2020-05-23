import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsComponent } from './all-sessions.component';

describe('AllSessionsComponent', () => {
  let component: AllSessionsComponent;
  let fixture: ComponentFixture<AllSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
