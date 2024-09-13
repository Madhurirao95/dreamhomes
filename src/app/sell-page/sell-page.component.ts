/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListingDetailsDialogComponent } from './listing-details/listing-details.component';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { IListingWithSource } from '../shared/Interfaces/IListing';

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.scss']
})
export class SellPageComponent {
  items: IListingWithSource[] = [];

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
  ) {
    const listingWithSource1 = {} as IListingWithSource;
    listingWithSource1.source = 'assets/carousel-img2.jpg';
    listingWithSource1.sourceType = 'image';

    const listingWithSource2 = {} as IListingWithSource;
    listingWithSource2.source = 'assets/carousel-img1.jpg';
    listingWithSource2.sourceType = 'image';

    const listingWithSource3 = {} as IListingWithSource;
    listingWithSource3.source = 'assets/carousel-img3.jpg';
    listingWithSource3.sourceType = 'image';

    const listingWithSource4 = {} as IListingWithSource;
    listingWithSource4.source = 'assets/carousel-img4.jpg';
    listingWithSource4.sourceType = 'image';

    this.items.push(listingWithSource1);
    this.items.push(listingWithSource2);
    this.items.push(listingWithSource3);
    this.items.push(listingWithSource4);
  }

  openListingDialog(): void {
    const config = new MatDialogConfig();
    config.width = '100%';
    config.height = '80%';
    config.data = {
      title: 'Add your Listing',
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
