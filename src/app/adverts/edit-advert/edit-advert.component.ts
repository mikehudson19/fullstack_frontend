import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { InMemoryLocationService } from '@app/_services/inMemoryLocation.service';
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

  constructor(private _inMemLocationService: InMemoryLocationService,
              private _formBuilder: FormBuilder) { }

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
        console.log(this.province);
      }
    );
  }

  getLocations(): void {
    this._inMemLocationService.getLocations().subscribe(locations => {
      console.log(locations);
      this.locations = locations;
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
