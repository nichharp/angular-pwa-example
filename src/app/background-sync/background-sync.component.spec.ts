import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundSyncComponent } from './background-sync.component';

describe('BackgroundSyncComponent', () => {
  let component: BackgroundSyncComponent;
  let fixture: ComponentFixture<BackgroundSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
