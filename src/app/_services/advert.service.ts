import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advert } from '@app/_models/advert';
import { IAdvert } from '@app/_models/IAdvert';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private _http: HttpClient) {}

  getAdvert(id: number): Observable<IAdvert> {
    if (id === 0) {
      return of(this.initializeAd());
    }
    
    return this._http.get<IAdvert>(`${environment.apiUrl}/api/adverts/${id}`);
  }

  getAllAdverts(): Observable<IAdvert[]> {
    return this._http.get<IAdvert[]>(`${environment.apiUrl}/api/adverts/all`);
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
    return this._http.put<IAdvert>(`${environment.apiUrl}/api/adverts/status`, advert, { headers });
  }

  updateAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put<IAdvert>(`${environment.apiUrl}/api/adverts/${advert.id}`, advert, { headers });
  }

  shadowDeleteAdvert(id: number): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this._http.put<IAdvert>(`${environment.apiUrl}/api/adverts?advertId=${id}`, id, { headers });
  }

  initializeAd(): IAdvert {
    return {
      headline: '',
      province: '',
      city: '',
      advertDetails: '',
      price: null,
      status: ''
    }
  }


}
