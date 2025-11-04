/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ListingDetailsDialogComponent } from './listing-details/listing-details.component';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { IListingWithMediaFile } from '../shared/Interfaces/IListing';

@Component({
  selector: 'app-sell-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.scss']
})
export class SellPageComponent {
  items: IListingWithMediaFile[] = [];

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
    const listingWithSource1 = {} as IListingWithMediaFile;
    listingWithSource1.media = 'assets/carousel-img2.jpg';
    listingWithSource1.mediaType = 'image';

    const listingWithSource2 = {} as IListingWithMediaFile;
    listingWithSource2.media = 'assets/carousel-img1.jpg';
    listingWithSource2.mediaType = 'image';

    const listingWithSource3 = {} as IListingWithMediaFile;
    listingWithSource3.media = 'assets/carousel-img3.jpg';
    listingWithSource3.mediaType = 'image';

    const listingWithSource4 = {} as IListingWithMediaFile;
    listingWithSource4.media = 'assets/carousel-img4.jpg';
    listingWithSource4.mediaType = 'image';

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
