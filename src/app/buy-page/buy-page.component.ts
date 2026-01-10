/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { Component, OnInit, ViewChild } from '@angular/core';
import { BuyPageService } from '../services/buy-page-service';
import { IListingWithMediaList } from '../shared/Interfaces/IListing';
import { PageEvent } from '@angular/material/paginator';
import { ImageCardComponent } from '../shared/image-card/image-card.component';
import { Router } from '@angular/router';
import { getMediaList } from '../shared/media-helper';
import { MapComponent } from '../shared/map/map.component';
@Component({
  selector: 'buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss'],
})
export class BuyPageComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  listings: IListingWithMediaList[] = [];
  page = 0;
  pageSize = 20;
  loading = false;
  coordinatex: number = 0;
  coordinatey: number = 0;
  length = 0;
  pageSizeOptions = [1, 50, 100];
  searchLocation: any;
  searchLocationLat: number = 0;
  searchLocationLng: number = 0;
  defaultView = 'List';
  titleStyle = {
    'font-weight': 500,
    'font-size.px': 25,
    'margin-top.px': 25,
    'margin-bottom.px': 0,
    'font-family': '"Protest Revolution", sans-serif',
  };

  mapPopupComponent = ImageCardComponent;
  constructor(
    private readonly buyPageService: BuyPageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      // If location access is provided by user, get listing based on that location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.loadAllMatchingListing(
            position.coords.longitude,
            position.coords.latitude
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          // If location access is denied by user, get listing based on last searched location
          this.searchLocation = localStorage.getItem('buySearchLocation');
          this.searchLocationLng = localStorage.getItem(
            'buyCoordinateX'
          ) as any;
          this.searchLocationLat = localStorage.getItem(
            'buyCoordinateY'
          ) as any;
          if (
            this.searchLocationLng != null &&
            this.searchLocationLat != null
          ) {
            this.loadAllMatchingListing(
              this.searchLocationLng,
              this.searchLocationLat
            );
          }
        }
      );
    }

    // else {
    //   console.error('Geolocation is not supported by this browser.');
    //   this.searchLocation = localStorage.getItem('buySearchLocation');
    //   const x = localStorage.getItem('buyCoordinateX') as any;
    //   const y = localStorage.getItem('buyCoordinateY') as any;
    //   this.loadAllMatchingListing(x, y);
    // }
  }

  // Pagination event handler
  handlePageEvent(e: PageEvent): void {
    console.log(e);
    this.page = e.pageIndex;

    this.loadAllMatchingListing(this.coordinatex, this.coordinatey);
  }

  // Handler for place selected event from location search component
  placeSelected(event: any): void {
    console.log(event);
    if (event && event.properties) {
      localStorage.setItem('buySearchLocation', event.properties.formatted);
    }

    if (event && event.geometry) {
      this.coordinatex = event.geometry.coordinates[0];
      this.coordinatey = event.geometry.coordinates[1];
      localStorage.setItem('buyCoordinateX', this.coordinatex.toString());
      localStorage.setItem('buyCoordinateY', this.coordinatey.toString());
      this.loadAllMatchingListing(this.coordinatex, this.coordinatey);
    }
  }

  // Load all listings matching the given coordinates
  loadAllMatchingListing(coordinatex: number, coordinatey: number): void {
    this.loading = true;

    this.buyPageService
      .getAllListingByCorrdinates(
        coordinatex,
        coordinatey,
        this.page,
        this.pageSize
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listings = [];
          if (res && res.results && res.results.length > 0) {
            res.results.forEach((item: any) => {
              const listing = {} as IListingWithMediaList;
              listing.area = item.area;
              listing.text = item.unit
                ? `${item.unit}, ${item.streetAddress}, ${item.city}, ${item.state}, ${item.zipCode}, ${item.country}`
                : `${item.streetAddress}, ${item.city}, ${item.state}, ${item.zipCode}, ${item.country}`;
              listing.price = item.listingPrice;
              listing.id = item.id;
              listing.latitude = item.coordinateY;
              listing.longitude = item.coordinateX;
              listing.mediaList = [];
              listing.mediaList.push(...getMediaList(item));
              this.listings.push(listing);
            });
          }
          this.loading = false;
          this.length = res.totalCount;
          // Display markers on map
          if (this.mapComponent) {
            this.mapComponent.displayMarkers(
              [this.coordinatey, this.coordinatex],
              this.mapComponent.zoom,
              this.listings
            );
          }
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  // Navigate to listing details page
  viewListing(listing: IListingWithMediaList): void {
    // this.sellPageService
    //   .getSellerInformationById(listing.id)
    //   .subscribe((res) => {
    this.goToListingDetailsPage(listing.id);
    // });
  }

  // Navigate to listing details page
  goToListingDetailsPage(id: number): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate(['/view-listing', id]);
  }
}
