/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {
  Component,
  EnvironmentInjector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { BuyPageService } from '../services/buy-page-service';
import {
  IListingWithSource,
  IListingWithSourceList
} from '../shared/Interfaces/IListing';
import { PageEvent } from '@angular/material/paginator';
import { ArcgisMapService } from '../services/arcgis-map.service';
import { MapOptions } from '../services/models/map-options';
@Component({
  selector: 'buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit, OnDestroy {
  listings: IListingWithSourceList[] = [];
  page = 0;
  pageSize = 20;
  loading = false;
  coordinatex: number = 0;
  coordinatey: number = 0;
  length = 0;
  pageSizeOptions = [1, 50, 100];
  searchLocation: any;
  view: any;
  defaultView = 'List';
  constructor(
    private readonly buyPageService: BuyPageService,
    private readonly mapService: ArcgisMapService,
    private readonly injector: EnvironmentInjector
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.loadAllMatchingListing(
            position.coords.longitude,
            position.coords.latitude
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          this.searchLocation = localStorage.getItem('buySearchLocation');
          const x = localStorage.getItem('buyCoordinateX') as any;
          const y = localStorage.getItem('buyCoordinateY') as any;
          if (x != null && y != null) {
            this.loadAllMatchingListing(x, y);
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

  ngOnDestroy(): void {
    // Clean up the MapView when the component is destroyed
    if (this.view) {
      this.view.destroy();
    }
  }

  async displayMap(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.mapService
      .initializeMap(
        'viewDiv',
        new MapOptions(this.coordinatey, this.coordinatex, 9)
      )
      .then((view) => {
        this.view = view;
        this.renderLocationsOnMap();

        this.view.popup.enabled = true;

        this.view.on('click', (event: any) => {
          this.view.hitTest(event).then((response: any) => {
            const graphic = response.results.find(
              (result: any) => result.graphic.layer.id === 'graphicsLayer1'
            )?.graphic;
            if (graphic) {
              console.log(this.view.popup);
              this.view.popup.open({
                location: event.mapPoint,
                features: [graphic]
              });
            }
          });
        });
        // this.view.on('pointer-move', (event: any) => {
        //   this.view.hitTest(event).then((response: any) => {
        //     const graphic = response.results.find(
        //       (result: any) => result.graphic.layer.id === 'graphicsLayer1'
        //     )?.graphic;

        //     if (graphic) {
        //       console.log(this.view.popup);
        //       console.log(graphic.geometry);
        //       this.view.popup.open({
        //         location: graphic.geometry,
        //         title: 'Hello',
        //         content: 'How are ya?'
        //       });
        //     } else {
        //       // this.view.popup.close();
        //     }
        //   });
        // });
      });
  }

  renderLocationsOnMap(): void {
    void this.mapService.addPointMarker(this.listings, this.view);
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
      localStorage.setItem('buyCoordinateX', this.coordinatex.toString());
      localStorage.setItem('buyCoordinateY', this.coordinatey.toString());
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
            listing.latitude = item.coordinateY;
            listing.longitude = item.coordinateX;
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
