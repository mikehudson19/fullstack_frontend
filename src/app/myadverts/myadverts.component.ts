import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { InMemoryUserService } from '../_services/inMemoryUser.service';

@Component({ templateUrl: 'myadverts.component.html' })
export class MyAdvertsComponent {
    loading = false;
    users: User[];

    constructor(private userService: UserService,
                private _inMemUserService: InMemoryUserService) { }

    ngOnInit() {
        this.loading = true;
        // this._inMemUserService.getUsers().subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // })
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

}