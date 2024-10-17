import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RouteService {

//  private routeUrl = 'https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?token=AAPTxy8BH1VEsoebNVZXo8HurM2FMh0eyjlzRlGetx1rxnITqqMvxs0ZQwhA5IiyHALYsGBwhSQXWQF0W2n-JBDfeVhiaFt8nZXffNFSESNvqUL8K-wAzQnw1B4JodeQ67HTnUyEJ_2pEtXyU6xdvHj2BLjly8lGa25kv5CGMEj2R4MDfMICPAe7BU8me05fJag3K-jU_IP1H8fYfn1D_ltsz2q2WMQHuixDExpft8otmH0.AT1_COpbyrl8';
private routeUrl = 'https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?stops=%7B"features":%5B%7B"geometry":%7B"x":-122.473948,"y":37.7436%7D,"attributes":%7B"Name":"Office","Attr_TravelTime":0%7D%7D,%7B"geometry":%7B"x":-122.439613,"y":37.746144%7D,"attributes":%7B"Name":"Store 1","Attr_TravelTime":25%7D%7D,%7B"geometry":%7B"x":-122.488254,"y":37.754092%7D,"attributes":%7B"Name":"Store 2","Attr_TravelTime":20%7D%7D,%7B"geometry":%7B"x":-122.44915,"y":37.731837%7D,"attributes":%7B"Name":"Store 3","Attr_TravelTime":30%7D%7D,%7B"geometry":%7B"x":-122.46441,"y":37.774756%7D,"attributes":%7B"Name":"Store 4","Attr_TravelTime":25%7D%7D,%7B"geometry":%7B"x":-122.426896,"y":37.769352%7D,"attributes":%7B"Name":"Store 5","Attr_TravelTime":20%7D%7D,%7B"geometry":%7B"x":-122.473948,"y":37.7436%7D,"attributes":%7B"Name":"Office","Attr_TravelTime":0%7D%7D%5D%7D&findBestSequence=true&preserverFirstStop=true&preserveLastStop=true&returnStops=true&returnDirections=true&returnRoutes=true&f=json&token=AAPTxy8BH1VEsoebNVZXo8HurM2FMh0eyjlzRlGetx1rxnITqqMvxs0ZQwhA5IiyHALYsGBwhSQXWQF0W2n-JBDfeVhiaFt8nZXffNFSESNvqUL8K-wAzQnw1B4JodeQ67HTnUyEJ_2pEtXyU6xdvHj2BLjly8lGa25kv5CGMEj2R4MDfMICPAe7BU8me05fJag3K-jU_IP1H8fYfn1D_ltsz2q2WMQHuixDExpft8otmH0.AT1_COpbyrl8'
constructor(private http: HttpClient) {}

getRoute(origin: string, destination: string): Observable<any> {
    
    const params = {f: 'json',stops: `${origin};${destination}`};

    return this.http.get(this.routeUrl);

  }

}