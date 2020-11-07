import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdvert } from '@app/_models/IAdvert';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private _http: HttpClient) {}

  getUserAdverts(): Observable<IAdvert[]> {
    return this._http.get<IAdvert[]>(`${environment.apiUrl}/api/adverts`);
  }
}
