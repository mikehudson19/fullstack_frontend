import { Component, OnDestroy, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CustomValidators } from "@app/_helpers/customValidators";
import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  manageAccountForm: FormGroup;
  message: { [key: string]: string } = {};
  sub: Subscription;
  authUser: User;

  validationMessages: {} = {
    forenames: {
      required: "A forename is required.",
      minlength: "Your forenames need to be at least 1 character long.",
      multipleSpaceValidator: "Your forenames cannot contain multiple spaces.",
      maxlength: "Your forename cannot be longer than 100 characters",
      noNumbers: "Your forename cannot contain any numbers",
      noSpecialChar: "Your forename cannot contain any special characters",
      spaceStart: "Your forename cannot start with a space",
    },
    surname: {
      required: "Your surname is required",
      minlength: "Your surname needs to be at least 3 characters long.",
      multipleSpaceValidator: "Your forenames cannot contain multiple spaces.",
      spaceStart: "Your surname cannot start with a space",
      maxlength: "Your surname cannot be longer than 100 characters",
      noNumbers: "Your surname cannot contain any numbers",
      noSpecialChar: "Your surname cannot contain any special characters",
    },
    email: {
      required: "Your email address is required.",
      minlength: "Your email address must be at least 6 characters long",
      noSpaceValidator: "Your email address cannot contain spaces.",
      email: "This must be a valid email address.",
      maxlength: "Your email cannot be longer than 100 characters",
    },
  };

  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService,
              private _router: Router) {}

  ngOnInit(): void {
    this.manageAccountForm = this._formBuilder.group({
      forenames: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          CustomValidators.multipleSpaceValidator,
          CustomValidators.noSpecialChars,
          CustomValidators.noNumbers,
          CustomValidators.spaceStartValidator,
        ],
      ],
      surname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          CustomValidators.spaceStartValidator,
          CustomValidators.multipleSpaceValidator,
          CustomValidators.noSpecialChars,
          CustomValidators.noNumbers,
        ],
      ],
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
    });

    this.sub = this.manageAccountForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(
        (value) => (this.message = this.invalidInputs(this.manageAccountForm))
      );

      this.getAuthUser();
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
    }
    return messages;
  }

  getAuthUser(): void {
    this.authUser = (JSON.parse(localStorage.getItem('currentUser')));
    this.displayUser();
  }

  displayUser(): void {
    this.manageAccountForm.patchValue({
      forenames: this.authUser.forenames,
      surname: this.authUser.surname,
      email: this.authUser.email
    })
  }

  saveChanges(): void {
    const userToUpdate = {
      id: this.authUser.id,
      forenames: this.manageAccountForm.get('forenames').value,
      surname: this.manageAccountForm.get('surname').value,
      email: this.manageAccountForm.get('email').value
    }
    this._userService.updateUser(userToUpdate).subscribe(user => {
      this._router
          .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
          .then(() => {
            this._router.navigate(["/myaccount"]);
          });
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
