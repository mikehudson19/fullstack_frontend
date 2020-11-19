import { Component, OnInit } from '@angular/core';
import { InMemoryAdvertService } from '@app/_mockServices/inMemoryAdvert.service';
import { IAdvert } from '@app/_models/IAdvert';
import { AdvertService } from '@app/_services/advert.service';

@Component({
  selector: 'app-home',
  templateUrl: './all-adverts.component.html',
  styleUrls: ['./all-adverts.component.scss']
})
export class AllAdvertsComponent implements OnInit {

  adverts: IAdvert[] = [];
  isAscending: boolean;
  orderBy: string = 'None';

  constructor(private _inMemAdService: InMemoryAdvertService,
              private _advertService: AdvertService) { }

  ngOnInit(): void {
    this._inMemAdService
    // this._advertService
    .getAllAdverts().subscribe((adverts => {
      this.adverts = adverts;
    }))
  }

  orderChoice(choice: string): void {
    if (choice === 'Ascending') {
      this.isAscending = true;
      this.orderBy = 'Price | Low-to-High'
      this.adverts.sort(this.compare('asc'));
    }
 
    if (choice === 'Descending') {
      this.isAscending = false;
      this.orderBy = 'Price | High-to-Low'
      this.adverts.sort(this.compare('desc'));
    }
  }

  compare(order: string): (a: IAdvert, b: IAdvert) => number {

    return function innerSort(a: IAdvert, b: IAdvert): number {

      const advertA: number = a.price;
      const advertB: number = b.price;

      let comparison: number = 0;
      if (advertA > advertB) {
        comparison = 1;
      } else if (advertA < advertB) {
        comparison = -1;
      }
      
      return (order === 'desc') ? (comparison * -1) : comparison;
      
    }
  }
}
