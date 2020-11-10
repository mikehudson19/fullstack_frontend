import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '@app/_models/ILocation';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _http: HttpClient) { }

  getLocations(): Observable<ILocation[]> {
    return this._http.get<ILocation[]>(`${environment.apiUrl}/api/locations`);
  }
}
