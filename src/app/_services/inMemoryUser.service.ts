import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/_models/user';



@Injectable({
  providedIn: 'root'
})

export class InMemoryUserService {

  userUrl: string = 'api/users';

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<Object[]> {
    return this._http.get<Object[]>(this.userUrl).pipe()
  }

  getUser(id: number): Observable<Object> {
    const url: string = `${this.userUrl}/${id}`
    return this._http.get<Object>(url);
  }

  saveUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type' : 'application/json' })
    const url = `${this.userUrl}`
    return this._http.post<User>(url, user, { headers : headers });
  }



  // createAdvert(advert: IAdvert): Observable<IAdvert> {
  //   const headers = new HttpHeaders({ 'Content-Type' : 'application/json' })
  //   const url = `${this.adUrl}/${advert.id}`
  //   return this._http.post<IAdvert>(url, advert, { headers : headers });
  // }
}