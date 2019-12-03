import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLotsComponent } from './profile-lots.component';

describe('ProfileLotsComponent', () => {
  let component: ProfileLotsComponent;
  let fixture: ComponentFixture<ProfileLotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
