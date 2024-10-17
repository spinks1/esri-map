import {  Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from "@angular/core";
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types
import { RouteService } from "../services/route.service"; 


@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"]
})
export class EsriMapComponent implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  // private _center: Array<number> = [0.1278, 51.5074];
  private _center: Array<number> = [-122.4194, 37.7749];
  private _basemap = "arcgis/navigation";
  private _loaded = false;
  private _view: esri.MapView = null;

  get mapLoaded(): boolean {return this._loaded;}

  @Input()
  set zoom(zoom: number) {this._zoom = zoom;}

  get zoom(): number {return this._zoom;}

  @Input()
  set center(center: Array<number>) {this._center = center;}

  get center(): Array<number> {return this._center;}

  @Input()
  set basemap(basemap: string) {this._basemap = basemap;}

  get basemap(): string {return this._basemap;}

  constructor(private routeService: RouteService) {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Config,EsriMap, EsriMapView, Graphic, GraphicsLayer] = await loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
      ]);
      Config.apiKey  = "AAPTxy8BH1VEsoebNVZXo8HurM2FMh0eyjlzRlGetx1rxnITqqMvxs0ZQwhA5IiyHALYsGBwhSQXWQF0W2n-JBDfeVhiaFt8nZXffNFSESNvqUL8K-wAzQnw1B4JodeQ67HTnUyEJ_2pEtXyU6xdvHj2BLjly8lGa25kv5CGMEj2R4MDfMICPAe7BU8me05fJag3K-jU_IP1H8fYfn1D_ltsz2q2WMQHuixDExpft8otmH0.AT1_COpbyrl8";
      
      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      const graphicsLayer = new GraphicsLayer();
      //map.add(graphicsLayer);
      // Initialize the MapView
      

      this.routeService.getRoute('34.052235,-118.243683', '35.052235,-118.243683').subscribe(response => {

        console.log(response);
        response.routeResults.forEach(function(result) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
          };
          this._view.graphics.add(result.route);
        });

        graphicsLayer.add(this._view.graphics);
        
        // const routeResult = response.routes.features;
        // const routeGraphic = new Graphic({
        //   geometry: routeResult.geometry,
        //   symbol: {
        //     type: 'simple-line',
        //     color: [0, 0, 255, 0.5],
        //     width: 5
        //   }
        // });
      // graphicsLayer.add(routeGraphic);


      });

      map.add(graphicsLayer);

      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      this._view = new EsriMapView(mapViewProperties);

      await this._view.when();
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }
}
