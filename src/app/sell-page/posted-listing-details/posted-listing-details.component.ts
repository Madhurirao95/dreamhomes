/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { SellPageService } from 'src/app/services/sell-page-service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ListingDetailsDialogComponent } from '../listing-details/listing-details.component';

@Component({
  selector: 'app-posted-listing-details',
  templateUrl: './posted-listing-details.component.html',
  styleUrls: ['./posted-listing-details.component.scss']
})
export class PostedListingDetailsComponent {
  isAuthorized = false;
  listings: Listing[] = [];
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif'
  };

  constructor(
    public dialog: MatDialog,
    private readonly sellPageService: SellPageService,
    public readonly authService: AuthenticationService
  ) {
    this.authService.isAuthorized$.subscribe((res) => {
      this.isAuthorized = res;
    });

    if (this.isAuthorized) {
      this.sellPageService.getAllListing().subscribe((res) => {
        this.buildTiles(res);
      });
    }
  }

  buildTiles(results: []): void {
    results.forEach((res: any) => {
      const listing = new Listing(
        res.streetAddress +
          ', ' +
          res.city +
          ', ' +
          res.state +
          ', ' +
          res.zipCode +
          ', ' +
          res.country,
        'data:' +
          res.randomDocument.documentType +
          ';base64,' +
          res.randomDocument.documentBase64,
        res.id
      );

      this.listings.push(listing);
    });
  }

  onViewDetails(id: number): void {
    this.sellPageService.getSellerInformationById(id).subscribe((res) => {
      res.id = id;
      this.openListingDetailsDialog(res);
    });
  }

  openListingDetailsDialog(res: any): void {
    const config = new MatDialogConfig();
    config.width = '100%';
    config.data = {
      title: 'Update your Listing',
      titleStyle: this.titleStyle,
      contentComponent: ListingDetailsDialogComponent,
      showCloseButton: true,
      initialData: res
    };
    const dialogRef = this.dialog.open(DialogComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}

export class Listing {
  Text: string = '';
  Source: string = '';
  Id: number = 0;

  constructor(text: string, source: string, id: number) {
    this.Text = text;
    this.Source = source;
    this.Id = id;
  }
}
