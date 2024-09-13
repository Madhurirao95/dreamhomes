/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, OnInit } from '@angular/core';
import { BuyPageService } from '../services/buy-page-service';
import {
  IListingWithSource,
  IListingWithSourceList
} from '../shared/Interfaces/IListing';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit {
  listings: IListingWithSourceList[] = [];
  page = 0;
  pageSize = 20;
  loading = false;
  coordinatex: number = 0;
  coordinatey: number = 0;
  length = 0;
  pageSizeOptions = [1, 50, 100];
  searchLocation: any;

  constructor(private readonly buyPageService: BuyPageService) {
  }

  ngOnInit (): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.loadAllMatchingListing(position.coords.longitude, position.coords.latitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          this.searchLocation = localStorage.getItem('buySearchLocation');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.searchLocation = localStorage.getItem('buySearchLocation');
    }
  }

  handlePageEvent(e: PageEvent): void {
    console.log(e);
    this.page = e.pageIndex;

    this.loadAllMatchingListing(this.coordinatex, this.coordinatey);
  }

  placeSelected(event: any): void {
    console.log(event);
    if (event && event.properties) {
      localStorage.setItem('buySearchLocation', event.properties.formatted);
    }

    if (event && event.geometry) {
      this.coordinatex = event.geometry.coordinates[0];
      this.coordinatey = event.geometry.coordinates[1];
      this.loadAllMatchingListing(this.coordinatex, this.coordinatey);
    }
  }

  loadAllMatchingListing(coordinatex: number, coordinatey: number): void {
    this.loading = true;

    this.buyPageService
      .getAllListingByCorrdinates(
        coordinatex,
        coordinatey,
        this.page,
        this.pageSize
      )
      .subscribe((res) => {
        console.log(res);
        this.listings = [];
        if (res && res.results && res.results.length > 0) {
          res.results.forEach((item: any) => {
            const listing = {} as IListingWithSourceList;
            listing.area = item.area;
            listing.text = item.unit
              ? `${item.unit}, ${item.streetAddress}, ${item.city}, ${item.state}, ${item.zipCode}, ${item.country}`
              : `${item.streetAddress}, ${item.city}, ${item.state}, ${item.zipCode}, ${item.country}`;
            listing.price = item.price;
            listing.id = item.id;
            listing.sourceList = [];
            item.documentList.forEach((document: any) => {
              const source = {} as IListingWithSource;
              source.source = `data:${document.documentType};base64,${document.documentBase64}`;
              if (document.documentType.includes('video')) {
                source.sourceType = 'video';
              } else if (document.documentType.includes('image')) {
                source.sourceType = 'image';
              }
              listing.sourceList.push(source);
            });

            this.listings.push(listing);
          });
        }
        this.length = res.totalCount;
        this.loading = false;
      });
  }
}
