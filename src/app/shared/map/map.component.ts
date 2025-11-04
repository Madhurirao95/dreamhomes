/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  AfterViewInit,
  Component,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Input,
  NgZone,
  OnDestroy,
  Type
} from '@angular/core';
import * as L from 'leaflet';
import { IListingWithMediaList } from '../Interfaces/IListing';
import { Router } from '@angular/router';
import { Icon } from 'leaflet';

delete (Icon.Default.prototype as any)._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() center: [number, number] = [39.8283, -98.5795]; // default: USA center
  @Input() zoom: number = 10;
  @Input() mapLocations: IListingWithMediaList[] = [];
  @Input() popupComponent!: Type<any>;
  private map!: L.Map;
  private readonly markersLayer = L.layerGroup();

  constructor(
    private readonly injector: EnvironmentInjector,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // cleanup when component is destroyed
    }
  }

  initMap(): void {
    // Initialize map
    this.map = L.map('map', {
      center: this.center,
      zoom: this.zoom
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.displayMarkers(this.center, this.zoom, this.mapLocations);
  }

  displayMarkers(center: [number, number], zoom: number, mapLocations: IListingWithMediaList[]): void {
    this.map.invalidateSize();

    this.ngZone.run(() => {
      setTimeout(() => {
        this.map.flyTo(center, zoom);
      }, 100);
    });

    this.markersLayer.clearLayers();

    // Add markers with hover popups
    mapLocations.forEach((m) => {
      const marker = L.marker([m.latitude, m.longitude]).addTo(
        this.markersLayer
      );

      const hostElem = document.createElement('div');

      const compRef: ComponentRef<any> = createComponent(this.popupComponent, {
        environmentInjector: this.injector
      });

      // Pass the whole marker
      compRef.instance.listing = m;
      compRef.instance.view.subscribe((data: any) => {
        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/view-listing', data.id])
        );
        const fullUrl = window.location.origin + url;
        window.open(fullUrl, '_blank');
      });
      compRef.changeDetectorRef.detectChanges();
      // Attach component's DOM to hostElem
      hostElem.appendChild(compRef.location.nativeElement);

      // Bind to Leaflet popup
      marker.bindPopup(hostElem);
      // marker.bindPopup(`${m.latitude} and ${m.longitude}`);

      // Show popup on hover
      marker.on('mouseover', () => marker.openPopup());
      // marker.on('mouseout', () => marker.closePopup());
    });
  }
}
