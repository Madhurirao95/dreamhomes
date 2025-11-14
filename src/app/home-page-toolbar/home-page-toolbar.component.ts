/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SignInDialogContentComponent } from './signIn-dialog/signIn-dialog-content.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@Component({
  selector: 'home-page-toolbar',
  templateUrl: './home-page-toolbar.component.html',
  styleUrls: ['./home-page-toolbar.component.scss']
})
export class HomePageToolBarComponent {
  title = 'Welcome to DreamHomes!';
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif'
  };

  showSignInButton = true;
  showProfileButton = false;
  showAgentPageButton = false;

  userName = '';
  constructor(
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {
    this.authService.isAuthorized$.subscribe((res) => {
      if (res) {
        this.showProfileButton = true;
        this.showSignInButton = false;
        this.userName = this.getUserName(this.authService.getEmail());
      } else {
        this.showSignInButton = true;
        this.showProfileButton = false;
      }
    });
  }

  ngOnInit(): void {
    this.authService
      .isAgent(this.authService.getEmail())
      .subscribe((isAgent) => {
        if (isAgent) {
          this.showAgentPageButton = true;
        } else {
          this.showAgentPageButton = false;
        }
      });
  }

  openAgentPage(): void {
    this.router.navigate(['/agent-dashboard']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: this.title,
        titleStyle: this.titleStyle,
        contentComponent: SignInDialogContentComponent,
        showCloseButton: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.isCallSuccessful) {
        this.showSignInButton = false;
        this.showProfileButton = true;
        this.userName = this.getUserName(result.email);
      }
      console.log('The dialog was closed');
    });
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Hey ' + this.userName.toLocaleUpperCase() + '!',
        titleStyle: this.titleStyle,
        contentComponent: ProfileDialogComponent,
        showCloseButton: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.isSignedOut) {
        this.showProfileButton = false;
        this.showSignInButton = true;
        this.userName = '';
      }
    });
  }

  getUserName(email: string): string {
    const parts = email.split('@');
    return parts[0].toLocaleUpperCase();
  }

  goToSellPage(): void {
    this.router.navigate(['/sell']);
  }

  goToBuyPage(): void {
    this.router.navigate(['/buy']);
  }
}
