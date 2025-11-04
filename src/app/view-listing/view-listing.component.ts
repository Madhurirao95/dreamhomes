import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellPageService } from '../services/sell-page-service';
import { MatDialog } from '@angular/material/dialog';
import { GalleryDialogComponent } from '../shared/gallery-dialog/gallery-dialog.component';
import { getMediaList } from '../shared/media-helper';
import { IListingWithMediaFile } from '../shared/Interfaces/IListing';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrl: './view-listing.component.scss'
})
export class ViewListingComponent {
  id: string | null = null;
  listing: any;
  photos: IListingWithMediaFile[] = [];
  features: string[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly sellPageService: SellPageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      const idNumber = this.id ? Number(this.id) : 0;
      this.sellPageService
        .getSellerInformationById(idNumber)
        .subscribe((res) => {
          this.listing = res;
          this.features = this.listing.properties ? this.listing.properties.split('\n') : [];
          this.photos.push(...getMediaList(this.listing));
        });
    });
  }

  tileClick(index: number): void {
    // if 6th tile and more photos, open full gallery; otherwise open gallery at index
    this.openGallery(index);
  }

  openGallery(startIndex = 0): void {
    this.dialog.open(GalleryDialogComponent, {
      data: { photos: this.photos, startIndex },
      width: '90vw',
      maxWidth: '1200px'
    });
  }
}
