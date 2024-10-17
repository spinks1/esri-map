import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  // Set our map properties
  // mapCenter = [-122.4194, 37.7749];
  mapCenter = [-118.24532,34.05398];
  basemapType = 'streets-navigation-vector';
  mapZoomLevel = 12;

  // See app.component.html
  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }
}

