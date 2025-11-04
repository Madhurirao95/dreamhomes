/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { SellPageService } from 'src/app/services/sell-page-service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ListingDetailsDialogComponent } from '../listing-details/listing-details.component';
import { IListingWithMediaFile } from 'src/app/shared/Interfaces/IListing';

@Component({
  selector: 'app-posted-listing-details',
  templateUrl: './posted-listing-details.component.html',
  styleUrls: ['./posted-listing-details.component.scss']
})
export class PostedListingDetailsComponent {
  isAuthorized = false;
  listings: IListingWithMediaFile[] = [];
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
      const listing = {} as IListingWithMediaFile;
      listing.text = res.unit
        ? `${res.unit}, ${res.streetAddress}, ${res.city}, ${res.state}, ${res.zipCode}, ${res.country}`
        : `${res.streetAddress}, ${res.city}, ${res.state}, ${res.zipCode}, ${res.country}`;
      listing.media = `data:${res.randomDocument.documentType};base64,${res.randomDocument.documentBase64}`;
      listing.id = res.id;

      if (res.randomDocument.documentType.includes('video')) {
        listing.mediaType = 'video';
      } else if (res.randomDocument.documentType.includes('image')) {
        listing.mediaType = 'image';
      }

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
    config.height = '80%';
    config.data = {
      title: 'Update your Listing',
      titleStyle: this.titleStyle,
      contentComponent: ListingDetailsDialogComponent,
      showCloseButton: true,
      initialData: res
    };
    this.dialog.open(DialogComponent, config);
  }
}
