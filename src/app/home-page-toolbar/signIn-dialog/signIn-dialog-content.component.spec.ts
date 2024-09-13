/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInDialogContentComponent } from './signIn-dialog-content.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('SignInDialogComponent', () => {
  let component: SignInDialogContentComponent;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let dialogComponentSpy: jasmine.SpyObj<DialogComponent>;
  let fixture: ComponentFixture<SignInDialogContentComponent>;

  beforeEach(async () => {
    const formSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    const authSpy = jasmine.createSpyObj('AuthenticationService', [
      'signIn',
      'setAuthToken',
      'setIsAuthorized',
      'setEmail',
      'createAccount'
    ]);
    const dialogSpy = jasmine.createSpyObj('DialogComponent', ['onCloseClick']);

    await TestBed.configureTestingModule({
      declarations: [SignInDialogContentComponent],
      providers: [
        { provide: DialogComponent, useValue: dialogSpy },
        { provide: FormBuilder, useValue: formSpy },
        { provide: AuthenticationService, useValue: authSpy }
      ],
      imports: [BrowserAnimationsModule, SharedModule]
    }).compileComponents();

    formBuilderSpy = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
    authServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    dialogComponentSpy = TestBed.inject(DialogComponent) as jasmine.SpyObj<DialogComponent>;

    const mockFormGroup = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', [])
    });

    formBuilderSpy.group.and.returnValue(mockFormGroup);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // ASSERT
    expect(component).toBeTruthy();
  });

  it('createSignInForm - should create Sign In Form', () => {
    // ACT
    component.createSignInForm();

    // ASSERT
    expect(component.signInForm).not.toBeNull();
    expect(component.signInForm).toBeInstanceOf(FormGroup);
  });

  it('createNewAccountForm - should create New Account Form', () => {
    // ACT
    component.createNewAccountForm();

    // ASSERT
    expect(component.createAccountForm).not.toBeNull();
    expect(component.createAccountForm).toBeInstanceOf(FormGroup);
  });

  it('getNewAccountForm - should get New Account Form', () => {
    // ACT
    const result = component.getNewAccountForm();

    // ASSERT
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(FormGroup);
    expect(result.get('email')).toBeDefined();
    expect(result.get('password')).toBeDefined();
    expect(result.get('email')?.validator).toBeDefined();
    expect(result.get('password')?.validator).toBeDefined();
  });

  it('onSubmit - should submit valid form on click of Submit without any errors', () => {
    // ARRANGE
    authServiceSpy.createAccount.and.returnValue(of(true));
    authServiceSpy.signIn.and.returnValue(of({ token: 'sample' }));

    const obj = {
      Email: component.createAccountForm.get('email')?.value,
      Password: component.createAccountForm.get('password')?.value
    };
    // ACT
    component.onSubmit();

    // ASSERT
    expect(authServiceSpy.createAccount).toHaveBeenCalledOnceWith(obj);
    expect(authServiceSpy.signIn).toHaveBeenCalledOnceWith(obj);
    expect(authServiceSpy.setAuthToken).toHaveBeenCalledOnceWith('sample');
    expect(authServiceSpy.setIsAuthorized).toHaveBeenCalledOnceWith(true);
    expect(authServiceSpy.setEmail).toHaveBeenCalledOnceWith(obj.Email);
    expect(dialogComponentSpy.onCloseClick).toHaveBeenCalledOnceWith({
      isCallSuccessful: true,
      email: obj.Email
    });
  });

  it('onSubmit - should handle errors on submit of invalid form on click of Submit', () => {
    // ARRANGE
    const err = new HttpErrorResponse({ error: 'some error' });
    authServiceSpy.createAccount.and.returnValue(throwError(() => err));

    const obj = {
      Email: component.createAccountForm.get('email')?.value,
      Password: component.createAccountForm.get('password')?.value
    };
    // ACT
    component.onSubmit();

    // ASSERT
    expect(authServiceSpy.createAccount).toHaveBeenCalledOnceWith(obj);
    expect(authServiceSpy.signIn).not.toHaveBeenCalled();
    expect(authServiceSpy.setAuthToken).not.toHaveBeenCalled();
    expect(authServiceSpy.setIsAuthorized).not.toHaveBeenCalled();
    expect(authServiceSpy.setEmail).not.toHaveBeenCalled();
    expect(dialogComponentSpy.onCloseClick).not.toHaveBeenCalled();
    expect(component.hasServiceError).toBeTrue();
  });

  it('onSignIn - should sign In successfully', () => {
    // ARRANGE
    authServiceSpy.signIn.and.returnValue(of({ token: 'sample' }));
    const obj = {
      Email: component.signInForm.get('email')?.value,
      Password: component.signInForm.get('password')?.value
    };
    // ACT
    component.onSignIn();

    // ASSERT
    expect(authServiceSpy.signIn).toHaveBeenCalledOnceWith(obj);
    expect(authServiceSpy.setAuthToken).toHaveBeenCalledOnceWith('sample');
    expect(authServiceSpy.setIsAuthorized).toHaveBeenCalledOnceWith(true);
    expect(authServiceSpy.setEmail).toHaveBeenCalledOnceWith(obj.Email);
    expect(dialogComponentSpy.onCloseClick).toHaveBeenCalledOnceWith({
      isCallSuccessful: true,
      email: obj.Email
    });
  });

  it('signInService - should throw error for unsuccessful Sign In', () => {
    // ARRANGE
    const err = new HttpErrorResponse({ error: 'some error' });
    authServiceSpy.signIn.and.returnValue(throwError(() => err));

    const obj = {
      Email: component.signInForm.get('email')?.value,
      Password: component.signInForm.get('password')?.value
    };
    // ACT
    component.onSignIn();

    // ASSERT
    expect(authServiceSpy.signIn).toHaveBeenCalledOnceWith(obj);
    expect(authServiceSpy.setAuthToken).not.toHaveBeenCalledOnceWith('sample');
    expect(authServiceSpy.setIsAuthorized).not.toHaveBeenCalledOnceWith(true);
    expect(authServiceSpy.setEmail).not.toHaveBeenCalledOnceWith(obj.Email);
    expect(dialogComponentSpy.onCloseClick).not.toHaveBeenCalledOnceWith({
      isCallSuccessful: true,
      email: obj.Email
    });
    expect(component.hasServiceError).toBeTrue();
  });

  it('onTabChange - should clear form values and validators on Tab Change', () => {
    // ARRANGE
    component.signInForm.get('email')?.setValue('someemail');
    component.signInForm.get('password')?.setValue('somepassword');

    component.signInForm.get('email')?.setErrors([Validators.required]);
    component.signInForm.get('email')?.setErrors([Validators.email]);
    component.signInForm.get('password')?.setErrors([Validators.required]);

    component.hasServiceError = true;
    component.serviceErrorMessage = 'some error';

    // ACT
    component.onTabChange();

    // ASSERT
    expect(component.signInForm.get('email')?.value).toBe(null);
    expect(component.signInForm.get('password')?.value).toBe(null);
    expect(component.signInForm.get('email')?.errors).toBe(null);
    expect(component.signInForm.get('password')?.errors).toBe(null);
    expect(component.signInForm.get('email')?.valid).toBe(true);
    expect(component.signInForm.get('password')?.valid).toBe(true);
    expect(component.hasServiceError).toBeFalse();
    expect(component.serviceErrorMessage).toBe('');
  });
});
