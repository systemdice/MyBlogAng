import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserRegistrationComponent } from './register-user-registration.component';

describe('RegisterUserRegistrationComponent', () => {
  let component: RegisterUserRegistrationComponent;
  let fixture: ComponentFixture<RegisterUserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
