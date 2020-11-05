import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdvert } from '@app/_models/IAdvert';
import { InMemoryAdvertService } from '@app/_mockServices/inMemoryAdvert.service';
import { InMemoryLocationService } from '@app/_mockServices/inMemoryLocation.service';
import { Subscription } from 'rxjs';
import { Advert } from '@app/_models/advert';

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.scss']
})
export class EditAdvertComponent implements OnInit, OnDestroy {

  locations = [];
  editAdvertForm: FormGroup;
  sub: Subscription;
  province: string; 
  id: number;
  advert: IAdvert;
  message: string = '';
  isConfirm: boolean = false;

  constructor(private _inMemLocationService: InMemoryLocationService,
              private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _inMemAdService: InMemoryAdvertService,
              private _router: Router) { }

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
      this.advert = advert;
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

  createAdvert(): void {
    const advert = new Advert(
      this.editAdvertForm.get('headline').value.trim(),
      this.editAdvertForm.get('province').value.trim(),
      this.editAdvertForm.get('city').value.trim(),
      this.editAdvertForm.get('price').value.trim(),
      this.editAdvertForm.get('advertDetails').value.trim(),
      'Live'
    );
      
    this._inMemAdService.createAdvert(advert).subscribe({
      next: () => this.afterSave()
    })
  }

  updateAdvert(): void {
    const updatedAdvert = { ...this.advert, ...this.editAdvertForm.value }
    this._inMemAdService.updateAdvert(updatedAdvert).subscribe({
      next: () => this.afterSave()
    })
  }

  deleteAdvert(): void {
    this._inMemAdService.deleteAdvert(this.id).subscribe(data => {
      console.log(data);
    })
  }

  onConfirm(): void {
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

  onCancel(): void {
    this.message = '';
  }

  onSave(): void {
    this.message = 'Are you sure you want to save your changes?';
  }

  afterSave(): void {
    this.editAdvertForm.markAsPristine;
    this.editAdvertForm.markAsUntouched;
    this._router.navigate(['/myadverts']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
