import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAdvert } from '@app/_models/IAdvert';
import { InMemoryAdvertService } from '@app/_mockServices/inMemoryAdvert.service';
import { InMemoryLocationService } from '@app/_mockServices/inMemoryLocation.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.scss']
})
export class EditAdvertComponent implements OnInit {

  locations = [];
  editAdvertForm: FormGroup;
  sub: Subscription;
  province: string; 
  id: number;
  

  constructor(private _inMemLocationService: InMemoryLocationService,
              private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _inMemAdService: InMemoryAdvertService) { }

  ngOnInit(): void {

    this.editAdvertForm = this._formBuilder.group({
      headline: ["", []],
      province: ["", []],
      city: ["", []],
      advertDetails: ["", []],
      price: ["", []]
    });

    this.getLocations();

    this.editAdvertForm.get('province').valueChanges
    .subscribe(
      (value) => {
        this.province = value;
      }
    );

    // Get the advert ID from the route parameter 
    this.sub = this._route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      this.getAdvert(this.id);
    });
  }

  getLocations(): void {
    this._inMemLocationService.getLocations().subscribe(locations => {
      console.log(locations);
      this.locations = locations;
    })
  }

  getAdvert(id: number): void {
    this._inMemAdService.getAdvert(id).subscribe(advert => {
      this.displayAdvert(advert);
    })
    
  }

  displayAdvert(advert: IAdvert): void {
    this.editAdvertForm.patchValue({
      headline: advert.headline,
      province: advert.province,
      city: advert.city,
      advertDetails: advert.advertDetails,
      price: advert.price
    })
  }

  onSave(): void {
    if (this.editAdvertForm.valid) {
      if (this.id == 0) {
        this.createAdvert();
        return;
      }

      if (this.id > 0) {
        this.updateAdvert();
        return;
      }

    } else {
      console.log('Please make sure the form is valid.')
    }
  }

  createAdvert(): void {

  }

  updateAdvert(): void {
    
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
