import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdvert } from '@app/_models/IAdvert';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private _http: HttpClient) {}

  getAdvert(id: number): Observable<IAdvert> {
    return this._http.get<IAdvert>(`${environment.apiUrl}/api/adverts/${id}`)
  }

  getUserAdverts(): Observable<IAdvert[]> {
    return this._http.get<IAdvert[]>(`${environment.apiUrl}/api/adverts`);
  }

  createAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<IAdvert>(`${environment.apiUrl}/api/adverts`, advert, { headers });
  }

  updateAdvertStatus(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<IAdvert>(`${environment.apiUrl}/api/adverts/status`, advert, { headers })
  }

  updateAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<IAdvert>(`${environment.apiUrl}/api/adverts/${advert.id}`, advert, { headers })
  }

  shadowDeleteAdvert(id: number): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this._http.put<IAdvert>(`${environment.apiUrl}/api/adverts?advertId=${id}`, id, { headers });
  }


}
