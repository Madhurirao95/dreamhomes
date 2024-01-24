import { Component } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { SignInDialogContentComponent } from './signIn-dialog/signIn-dialog-content.component';

@Component({
  selector: 'home-page-toolbar',
  templateUrl: './home-page-toolbar.component.html',
  styleUrls: ['./home-page-toolbar.component.scss']
})
export class HomePageToolBarComponent {
  title = 'Welcome to SpotAHome!';
  titleStyle = { 'font-weight': 500, 'font-size.px': 25, 'margin-top.px': 25, 'margin-bottom.px': 0 };
  constructor (public dialog: MatDialog) {}

  openDialog (): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: this.title,
        titleStyle: this.titleStyle,
        contentComponent: SignInDialogContentComponent,
        showCloseButton: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
