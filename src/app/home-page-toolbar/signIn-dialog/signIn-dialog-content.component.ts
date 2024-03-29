/* eslint-disable @typescript-eslint/consistent-type-imports */

import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { patternValidator } from 'src/app/shared/custom-validator';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'signIn-dialog-content',
  templateUrl: './signIn-dialog-content.component.html',
  styleUrls: ['./signIn-dialog-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInDialogContentComponent {
  signInForm!: FormGroup;
  createAccountForm!: FormGroup;
  hasServiceError = false;
  serviceErrorMessage = '';

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly dialogComponent: DialogComponent,
    private readonly authService: AuthenticationService
  ) {
    this.createSignInForm();
    this.createNewAccountForm();
  }

  createSignInForm (): void {
    this.signInForm = this.getNewAccountForm();
  }

  createNewAccountForm (): void {
    this.createAccountForm = this.getNewAccountForm();
  }

  getNewAccountForm (): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '', Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          patternValidator(/[@_!#$%^&*()<>?/|}{~:]/, { hasSpecialCharacters: true }),
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8)])
      ]
    });
  }

  onSubmit (): void {
    console.log('Your form data : ', this.createAccountForm.value);
    const obj = {
      Email: this.createAccountForm.get('email')?.value,
      Password: this.createAccountForm.get('password')?.value
    };

    this.authService.createAccount(obj).subscribe({
      next: () => {
        this.signInService(obj);
      },
      error: err => { this.handleErrors(err); }
    });
  }

  onSignIn (): void {
    console.log('Your form data : ', this.signInForm.value);

    const obj = {
      Email: this.signInForm.get('email')?.value,
      Password: this.signInForm.get('password')?.value
    };

    this.signInService(obj);
  }

  signInService (obj: any): void {
    this.authService.signIn(obj).subscribe({
      next: (res) => {
        console.log(res);
        if (res.token !== undefined && res.token !== null) {
          this.authService.setAuthToken(res.token);
          this.authService.setIsAuthorized(true);
          this.authService.setEmail(obj.Email);
        }
        this.dialogComponent.onCloseClick({
          isCallSuccessful: true,
          email: obj.Email
        });
      },
      error: (err) => {
        this.handleErrors(err);
      }
    });
  }

  onTabChange (): void {
    this.signInForm.get('email')?.setErrors(null);
    this.signInForm.get('password')?.setErrors(null);

    this.signInForm.get('email')?.clearValidators();
    this.signInForm.get('password')?.clearValidators();

    this.createAccountForm.get('email')?.setErrors(null);
    this.createAccountForm.get('password')?.setErrors(null);

    this.createAccountForm.get('email')?.clearValidators();
    this.createAccountForm.get('password')?.clearValidators();

    this.signInForm.reset();
    this.createAccountForm.reset();

    this.hasServiceError = false;
    this.serviceErrorMessage = '';

    this.signInForm.get('email')?.updateValueAndValidity();
    this.signInForm.get('password')?.updateValueAndValidity();

    this.createAccountForm.get('email')?.updateValueAndValidity();
    this.createAccountForm.get('password')?.updateValueAndValidity();
  }

  handleErrors (error: HttpErrorResponse): void {
    this.hasServiceError = true;
    this.serviceErrorMessage = error.error.message;
  }
}
