import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { patternValidator } from 'src/app/shared/custom-validator';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './forgot-password-email-dialog.component.html',
  styleUrl: './forgot-password-email-dialog.component.scss',
})
export class ForgotPasswordEmailDialogComponent {
  forgotPasswordEmailForm!: FormGroup;
  showNewPasswordStep = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthenticationService
  ) {
    this.forgotPasswordEmailForm = this.createForgotPasswordEmailForm();
  }

  createForgotPasswordEmailForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  onConfirmEmail(): void {
    const email = this.forgotPasswordEmailForm.value.email;
    this.authService.isAnExistingUser(email).subscribe((res) => {
      this.showNewPasswordStep = res;
      if (res === true) {
        this.forgotPasswordEmailForm.get('newPassword')?.setValidators([
          Validators.required,
          Validators.minLength(8),
          patternValidator(/\d/, { hasNumber: true }),
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          patternValidator(/[a-z]/, { hasSmallCase: true }),
          patternValidator(/[@_!#$%^&*()<>?/|}{~:]/, {
            hasSpecialCharacters: true,
          }),
        ]);
        this.forgotPasswordEmailForm
          .get('newPassword')
          ?.updateValueAndValidity();

        this.forgotPasswordEmailForm
          .get('confirmPassword')
          ?.setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);

        this.forgotPasswordEmailForm
          .get('confirmPassword')
          ?.updateValueAndValidity();
      }
    });
  }

  onPasswordChange(): void {
    const obj = {
      Email: this.forgotPasswordEmailForm.get('email')?.value,
      Password: this.forgotPasswordEmailForm.get('confirmPassword')?.value,
    };
    this.authService.resetPassword(obj).subscribe((res) => {
      console.log(res);
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.forgotPasswordEmailForm.get('newPassword')?.value;
    const confirmPassword = control.value;

    let forbidden = false;

    if (password !== confirmPassword) {
      forbidden = true;
    }

    return forbidden ? { passwordMismatch: true } : null;
  }
}
