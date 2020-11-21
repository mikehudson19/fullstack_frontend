import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { IUser } from '@app/_models/IUser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private _http: HttpClient) { }

    getAll(): Observable<IUser[]> {
        return this._http.get<IUser[]>(`${environment.apiUrl}/api/users`);
    }

    getAuthUser(): Observable<IUser> {
        return this._http.get<IUser>(`${environment.apiUrl}/api/users/auth`);
    }

    createUser(body: IUser): Observable<IUser> {
        return this._http.post<IUser>(`${environment.apiUrl}/api/users`, body);
    }

    updateUser(body: IUser): Observable<IUser> {
        return this._http.put<IUser>(`${environment.apiUrl}/api/users`, body);
    }

    updateUserPassword(body: {}): Observable<IUser> {
        return this._http.put<IUser>(`${environment.apiUrl}/api/users/password`, body);
    }
}