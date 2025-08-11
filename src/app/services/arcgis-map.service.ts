/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MapOptions } from './models/map-options';
import { IListingWithSourceList } from '../shared/Interfaces/IListing';

@Injectable({
  providedIn: 'root'
})
export class ArcgisMapService {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  initializeMap = (container: string, options: MapOptions): Promise<void> => {
    return loadModules(['esri/config', 'esri/Map', 'esri/views/MapView']).then(
      ([esriConfig, Map, MapView]) => {
        esriConfig.apiKey =
          'AAPK12d0fa661a6b4870904e3e44f4f02c8809jDyCXFcGQ88aY7JaNwieJ0eUY3ZwUf-IswC5zGSIHxuMUtH1diReS7xavBgeJ3';
        const map = new Map({
          basemap: options.basemap // Set your basemap
        });

        const view = new MapView({
          container, // Reference to the DOM element (e.g., 'viewDiv')
          map,
          zoom: options.zoom, // Initial zoom level
          center: [options.longitude, options.latitude], // Longitude, latitude
          popup: {
            dockEnabled: false,
            collapseEnabled: false,
            autoOpenEnabled: false,
            alignment: 'top-center', // Position pop-up above the marker
            offset: [0, 10],
            dockOptions: {
              buttonEnabled: false,
              breakpoint: true,
              position: 'auto'
            }
          }
        });

        return view;
      }
    );
  };

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  addPointMarker = (
    coordinates: IListingWithSourceList[],
    view: any
  ): Promise<void> => {
    return loadModules([
      'esri/config',
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
      'esri/PopupTemplate'
    ]).then(([esriConfig, Graphic, GraphicsLayer, PopupTemplate]) => {
      esriConfig.apiKey =
        'AAPK12d0fa661a6b4870904e3e44f4f02c8809jDyCXFcGQ88aY7JaNwieJ0eUY3ZwUf-IswC5zGSIHxuMUtH1diReS7xavBgeJ3';
      let graphicsLayer = view.map.layers?.find(
        (layer: { id: string }) => layer.id === 'graphicsLayer1'
      );
      if (!graphicsLayer) {
        // Create a new GraphicsLayer if it doesn't exist
        graphicsLayer = new GraphicsLayer({ id: 'graphicsLayer1' });
        view.map.layers.add(graphicsLayer);
      }

      coordinates.forEach((x) => {
        const latitude = x.latitude;
        const longitude = x.longitude;
        const point = {
          type: 'point', // autocasts as new Point()
          longitude,
          latitude
        };

        const markerSymbol = {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          color: [226, 119, 40], // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 2
          }
        };

        const popTemplate = new PopupTemplate({
          title: 'Hello',
          content: 'How are you?'
        });

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
          attributes: x,
          popUpTemplate: popTemplate
        });

        graphicsLayer.add(pointGraphic);
      });
    });
  };
}
