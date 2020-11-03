import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { IUser } from '@app/_models/IUser';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private _http: HttpClient) { }

    getAll() {
        return this._http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    createUser(body: IUser) {
        return this._http.post<IUser>(`${environment.apiUrl}/api/users`, body);
    }
}