/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListingDetailsDialogComponent } from './listing-details/listing-details.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.scss']
})
export class SellPageComponent {
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif'
  };

  constructor(
    public readonly authService: AuthenticationService,
    public dialog: MatDialog
  ) {}

  openListingDialog(): void {
    const config = new MatDialogConfig();
    config.width = '100%';
    config.data = {
      title: 'Update your Listing',
      titleStyle: this.titleStyle,
      contentComponent: ListingDetailsDialogComponent,
      showCloseButton: true
    };
    const dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
