import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/_models/user';


@Injectable({
  providedIn: 'root'
})
export class InMemoryLocationService {

  locationUrl: string = 'api/locations'

  constructor(private _http: HttpClient) { }

  getLocations(): Observable<[]> {
    return this._http.get<[]>(this.locationUrl).pipe()
  }
}
