import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly dialogComponent: DialogComponent,
    private readonly router: Router
  ) {}

  onSignOut(): void {
    this.authService.signOut();
    this.dialogComponent.onCloseClick({ isSignedOut: true });
    void this.router.navigate(['/buy']);
  }
}
