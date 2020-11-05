import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/_models/user';
import { IAdvert } from '@app/_models/IAdvert';



@Injectable({
  providedIn: 'root'
})

export class InMemoryAdvertService {

  advertUrl: string = 'api/adverts';

  constructor(private _http: HttpClient) { }

  getAdverts(): Observable<Object> {
    return this._http.get<Object>(this.advertUrl).pipe()
  }

  getAdvert(id): Observable<IAdvert> {
    if (id == 0) {
      return of(this.initializeAd());
    }
    
    return this._http.get<IAdvert>(`${this.advertUrl}/${id}`)
  }

  createAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<IAdvert>(this.advertUrl, advert, { headers });
  } 

  updateAdvert(advert: IAdvert): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' });
    const url = `${this.advertUrl}/${advert.id}`;
    return this._http.put<IAdvert>(url, advert, { headers });
  }

  deleteAdvert(id: number): Observable<IAdvert> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' });
    const url = `${this.advertUrl}/${id}`;
    return this._http.delete<IAdvert>(url, { headers });
  }

  initializeAd(): IAdvert {
    return {
      headline: '',
      province: '',
      city: '',
      advertDetails: '',
      price: null
    }
  }

}