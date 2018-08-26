import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomePageComponent } from './profile-home-page.component';

describe('ProfileHomePageComponent', () => {
  let component: ProfileHomePageComponent;
  let fixture: ComponentFixture<ProfileHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
