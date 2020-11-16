import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InMemoryAdvertService } from '@app/_mockServices/inMemoryAdvert.service';
import { IAdvert } from '@app/_models/IAdvert';
import { AdvertService } from '@app/_services/advert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.scss']
})
export class AdvertDetailComponent implements OnInit, OnDestroy {

  sub: Subscription = new Subscription();
  id: number;
  advert: IAdvert;

  constructor(private _route: ActivatedRoute,
              private _inMemAdService: InMemoryAdvertService,
              private _advertService: AdvertService) { }

  ngOnInit(): void {

    this.sub.add(
      this._route.paramMap.subscribe((params) => {
        this.id = +params.get("id");
        this.getAdvert(this.id);
      })
    );
  }

  getAdvert(id: number): void {
    this._inMemAdService.getAdvert(id).subscribe((advert => {
      this.advert = advert;
    }))
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}
