import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Input,
  OnDestroy,
  Type,
  ViewContainerRef
} from '@angular/core';
import * as L from 'leaflet';
import { IListingWithSourceList } from '../Interfaces/IListing';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() center: [number, number] = [39.8283, -98.5795]; // default: USA center
  @Input() zoom: number = 10;
  @Input() mapLocations: IListingWithSourceList[] = [];
  @Input() popupComponent!: Type<any>;
  private map!: L.Map;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: EnvironmentInjector,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // cleanup when component is destroyed
    }
  }

  private initMap(): void {
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

    // Add markers with hover popups
    this.mapLocations.forEach((m) => {
      const marker = L.marker([m.latitude, m.longitude]).addTo(this.map);

      const hostElem = document.createElement('div');

      const compRef: ComponentRef<any> = createComponent(this.popupComponent, {
        environmentInjector: this.injector
      });

      // Pass the whole marker
      compRef.instance.listing = m;

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
