import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@arcgis/map-components/dist/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    defineCustomElements(window, { resourcesUrl: 'https://js.arcgis.com/map-components/4.30/assets' });
  }
}
