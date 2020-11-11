import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "@app/_models";
import { UserService, AuthenticationService } from "@app/_services";
import { InMemoryUserService } from "../../_mockServices/inMemoryUser.service";
import { InMemoryAdvertService } from "@app/_mockServices/inMemoryAdvert.service";
import { Router } from "@angular/router";
import { IAdvert } from "@app/_models/IAdvert";
import { AdvertService } from "@app/_services/advert.service";

@Component({
  templateUrl: "myadverts.component.html",
  styleUrls: ["./myadverts.component.scss"],
})
export class MyAdvertsComponent implements OnInit {
  loading: boolean = false;
  users: User[];
  adverts: IAdvert[] = [];
  message: string;
  advertToDeleteId: number;
  advert: IAdvert;

  constructor(
    private userService: UserService,
    private _inMemUserService: InMemoryUserService,
    private _inMemAdvertService: InMemoryAdvertService,
    private _router: Router,
    private _advertService: AdvertService
  ) {}

  ngOnInit() {
    this.loading = true;

    this._inMemAdvertService
    // this._advertService
    .getUserAdverts().subscribe((adverts) => {
      this.loading = false;
      this.adverts = adverts;
    });
  }

  onDelete(advertId: number): void {
    this.message = `Are you sure you want to delete this advert? This action cannot be undone.`;
    this.advertToDeleteId = advertId;
  }

  onConfirm(): void {
    this._inMemAdvertService
    // this._advertService
      .shadowDeleteAdvert(this.advertToDeleteId)
      .subscribe((data) => {
        this._router
          .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
          .then(() => {
            this._router.navigate(["/myadverts"]);
          });
      });
  }

  onCancel(): void {
    this.message = "";
  }

  changeStatus(advertToUpdateId: number): void {
    this._inMemAdvertService
    // this._advertService
    .getAdvert(advertToUpdateId).subscribe((advert) => {
      this.advert = advert;
      let newStatus;
      if (this.advert.status == "Live") {
        newStatus = "Hidden";
      } else {
        newStatus = "Live";
      }

      const updatedAdvert = { ...this.advert, ...{ status: newStatus } };

      this._advertService
        .updateAdvertStatus(updatedAdvert)
        .subscribe((data) => {
          console.log(data);
        });

      this._advertService.getUserAdverts().subscribe((adverts) => {
        this.loading = false;
        this.adverts = adverts;
        this._router
          .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
          .then(() => {
            this._router.navigate(["/myadverts"]);
          });
      });
    });
  }
}
