import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  geocode(address: string): Observable<google.maps.LatLngLiteral> {
    return this.http.get<any>(`${this.GEOCODING_API_URL}?address=${encodeURIComponent(address)}&key=AIzaSyDWy7B3Qq-9rbZ-ATXd-axTSnARCa1NIHc`).pipe(
      map(response => {
        if (response.status === 'OK') {
          const { lat, lng } = response.results[0].geometry.location;
          return { lat, lng };
        }
        throw new Error('Geocoding failed');
      })
    );
  }
}