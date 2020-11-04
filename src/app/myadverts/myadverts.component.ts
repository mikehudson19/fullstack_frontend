import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { InMemoryUserService } from '../_services/inMemoryUser.service';
import { InMemoryAdvertService } from '@app/_services/inMemoryAdvert.service';

@Component({ templateUrl: 'myadverts.component.html',
             styleUrls: ["./myadverts.component.scss"],
})

export class MyAdvertsComponent implements OnInit {
    loading: boolean = false;
    users: User[];
    adverts: Object;
    advert: boolean = true;

    constructor(private userService: UserService,
                private _inMemUserService: InMemoryUserService,
                private _inMemAdvertService: InMemoryAdvertService) { }

    ngOnInit() {
        this.loading = true;
        this._inMemAdvertService.getAdverts().subscribe(adverts => {
            this.loading = false;
            this.adverts = adverts;
            console.log(adverts);
        })

        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
    }

}