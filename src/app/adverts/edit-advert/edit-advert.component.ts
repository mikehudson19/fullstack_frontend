import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdvert } from '@app/_models/IAdvert';
import { InMemoryAdvertService } from '@app/_mockServices/inMemoryAdvert.service';
import { InMemoryLocationService } from '@app/_mockServices/inMemoryLocation.service';
import { Subscription } from 'rxjs';
import { Advert } from '@app/_models/advert';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.scss']
})
export class EditAdvertComponent implements OnInit, OnDestroy {

  locations = [];
  editAdvertForm: FormGroup;
  sub: Subscription = new Subscription();
  province: string; 
  cities: [];
  id: number;
  advert: IAdvert;
  actionMessage: string = '';
  isConfirm: boolean = false;
  validationMessage: { [key: string]: string } = {};
  alertMessage: string = '';

  validationMessages: {} = {
    headline: {
      required: 'An advert headline is required.',
      minlength: 'Your advert headline must be at least 10 characters long.',
      maxlength: 'Your advert headline cannot be longer than 100 characters',
    },
    province: {
      required: 'Your province is required.',
    },
    city: {
      required: 'Your city is required.',
    },
    advertDetails: {
      required: 'Advert deatils are required.',
      minlength: 'Your advert details need to be at least 10 characters long.',
      maxLength: 'Your advert details cannot be longer than 1000 characters.'
    },
    price: {
      required: 'An advert price is required.'
    }
  };

  constructor(private _inMemLocationService: InMemoryLocationService,
              private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _inMemAdService: InMemoryAdvertService,
              private _router: Router) { }

  ngOnInit(): void {

    this.editAdvertForm = this._formBuilder.group({
      headline: ["", [ Validators.required, Validators.minLength(10), Validators.maxLength(100) ]],
      province: ["", [ Validators.required ]],
      city: ["", [ Validators.required ]],
      advertDetails: ["", [ Validators.required, Validators.minLength(10), Validators.maxLength(1000) ]],
      price: ["", [ Validators.required, Validators.min(10000), Validators.max(100000000) ]]
    });

    this.getLocations();

    this.sub.add(this.editAdvertForm.get('province').valueChanges
    .subscribe(
      (value) => {
        this.province = value.replace(/ +/g, "");
        this.getCities(); // GETTING AN ERROR FROM THIS METHOD - NEED TO FIX IT BEFORE SUBMITTING. 
      }
    )
    );

    // Get the advert ID from the route parameter 
    this.sub.add(this._route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      this.getAdvert(this.id);
    })
    );

    this.sub.add(this.editAdvertForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(value => this.validationMessage = this.invalidInputs(this.editAdvertForm)
      ))
  }

  invalidInputs(formgroup: FormGroup) {
    let messages = {};
    for (const input in formgroup.controls) {
      const control = formgroup.controls[input];

      if (this.validationMessages[input]) {
        messages[input] = "";
        if (control.errors && (control.dirty || control.touched)) {
          Object.keys(control.errors).map((messageKey) => {
            messages[input] = this.validationMessages[input][messageKey];
          });
        }
      }
    }
    return messages;
  }

  getCities(): void {
    this._inMemLocationService.getCities(this.province).subscribe(
      cities => this.cities = cities,
      err => console.error(err)
    )
  }

  getLocations(): void {
    this._inMemLocationService.getLocations().subscribe(locations => {
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
      this.actionMessage = '';
      this.alertMessage = 'Please ensure the form is valid.'
      setTimeout (() => {
        this.alertMessage = '';
     }, 2000);
    }
  }

  onCancel(): void {
    this.actionMessage = '';
  }

  onSave(): void {
    this.actionMessage = 'Are you sure you want to save your changes?';
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
