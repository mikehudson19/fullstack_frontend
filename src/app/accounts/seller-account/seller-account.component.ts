import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from '@app/_helpers/customValidators';
import { User } from "@app/_models";
import { UserService } from "@app/_services";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: "app-seller-account",
  templateUrl: "./seller-account.component.html",
  styleUrls: ["./seller-account.component.scss"],
})
export class SellerAccountComponent implements OnInit {
  authUser: User;
  sellerForm: FormGroup;
  message: { [key: string]: string } = {}
  sub: Subscription;

  validationMessages: {} = {
    email: {
      required: "Your email address is required.",
      minlength: "Your email address must be at least 6 characters long",
      noSpaceValidator: "Your email address cannot contain spaces.",
      email: "This must be a valid email address.",
      maxlength: "Your email cannot be longer than 100 characters",
    },
    contactNumber: {
      onlyNumbers: "You can only enter numbers into this field.",
      noSpaceValidator: "Your contact number cannot contain spaces.",
      maxlength: "Your contact number cannot be longer than 12 digits."
    }
  };

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sellerForm = this._formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(100),
          CustomValidators.noSpaceValidator,
        ],
      ],
      contactNumber: ["", [ CustomValidators.onlyNumbers, CustomValidators.noSpaceValidator, Validators.maxLength(12) ]],
    });

    this.sub = this.sellerForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(data => {
        this.message = this.invalidInputs(this.sellerForm);
    })

    this.getUser();
  }

  getUser(): void {
    this._userService.getAuthUser().subscribe(user => {
      this.authUser = user;
      this.displayUser();
    })
    // this.authUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  displayUser(): void {
    this.sellerForm.patchValue({
      email: this.authUser.email,
      contactNumber: this.authUser.contactNumber,
    });
  }

  invalidInputs(formgroup: FormGroup) {
    let messages = {};
    for (const input in formgroup.controls) {
      const control = formgroup.controls[input];

      // If any of the other fields don't meet the requirements, assign error message.
      if (this.validationMessages[input]) {
        messages[input] = "";
        if (control.errors && (control.dirty || control.touched)) {
          Object.keys(control.errors).map((messageKey) => {
            messages[input] = this.validationMessages[input][messageKey];
          });
        }
      }

      if (input === 'contactNumber' && control.value === "") messages[input] = "";

    }
    return messages;
  }

  updateDetails(): void {
    console.log(typeof +this.sellerForm.get("contactNumber").value);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
