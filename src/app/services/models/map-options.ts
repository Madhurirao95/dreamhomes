export class MapOptions {
  latitude: number;
  longitude: number;
  basemap?: string;
  zoom: number;

  constructor(
    latitude: number,
    longitude: number,
    zoom: number,
    basemap: string = 'topo-vector'
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
    this.basemap = basemap;
  }
}
