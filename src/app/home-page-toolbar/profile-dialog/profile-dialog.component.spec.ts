/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDialogComponent } from './profile-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

describe('ProfileDialogComponent', () => {
  let component: ProfileDialogComponent;
  let fixture: ComponentFixture<ProfileDialogComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let dialogComponentSpy: jasmine.SpyObj<DialogComponent>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['signOut']);
    const dialogSpy = jasmine.createSpyObj('DialogComponent', ['onCloseClick']);
    await TestBed.configureTestingModule({
      declarations: [ProfileDialogComponent],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: DialogComponent, useValue: dialogSpy }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    dialogComponentSpy = TestBed.inject(
      DialogComponent
    ) as jasmine.SpyObj<DialogComponent>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // ASSERT
    expect(component).toBeTruthy();
  });

  it('signOut - should sign Out of the app', () => {
    // ACT
    component.onSignOut();

    // ASSERT
    expect(authServiceSpy.signOut).toHaveBeenCalledTimes(1);
    expect(dialogComponentSpy.onCloseClick).toHaveBeenCalledOnceWith({
      isSignedOut: true
    });
  });
});
