import { Component, OnInit } from '@angular/core';
import { InMemoryAdvertService } from '@app/_mockServices/inMemoryAdvert.service';
import { IAdvert } from '@app/_models/IAdvert';

@Component({
  selector: 'app-home',
  templateUrl: './all-adverts.component.html',
  styleUrls: ['./all-adverts.component.scss']
})
export class AllAdvertsComponent implements OnInit {

  adverts: IAdvert[] = [];

  constructor(private _inMemAdService: InMemoryAdvertService) { }

  ngOnInit(): void {
    this._inMemAdService.getAllAdverts().subscribe((adverts => {
      this.adverts = adverts;
    }))
  }

  choose(): void {
    // If the payload is ascending, call the API ascending method and assign this.adverts to a method calling the ascending order.

    // If the payload is descending, call the API descending method and assign this.adverts to a method calling descending.
  }

}
