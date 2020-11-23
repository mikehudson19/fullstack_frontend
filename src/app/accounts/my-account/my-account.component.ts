import { Component, OnDestroy, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "@app/_helpers/customValidators";
import { User } from "@app/_models";
import { IPasswords } from '@app/_models/IPasswords';
import { IUser } from '@app/_models/IUser';
import { UserService } from "@app/_services";
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
  authUser: IUser;
  fieldTextType: boolean = false;
  error: string = '';
  successMessage: string = '';

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
    currentPassword: {
      required: "Your current password is required.",
    },
    passwords: {
      match: "Your passwords must match.",
    },
    password: {
      required: "A password is required.",
      minlength: "Your password needs to be at least 8 characters long.",
      maxlength: "Your password cannot be longer than 100 characters.",
      noSpaceValidator: "Your password cannot contain spaces.",
      passwordNumber: "Your password must contain at least one number.",
      passwordUpperCase:
        "Your password must contain at leat one uppercase character.",
    },
    confirmPass: {
      required: "Please confirm your password.",
    },
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

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
      currentPassword: ["", [Validators.required]],
      passwords: this._formBuilder.group(
        {
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(100),
              CustomValidators.noSpaceValidator,
              CustomValidators.passwordNumber,
              CustomValidators.passwordUpperCase,
            ],
          ],
          confirmPass: ["", [Validators.required]],
        },
        { validator: CustomValidators.passwordCompare }
      ),
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

      // If the passwords don't match, assign error message.
      if (control instanceof FormGroup && control.errors) {
        Object.keys(control.errors).map((messageKey) => {
          messages[input] = this.validationMessages[input][messageKey];
        });
      }

      // If the password field doesn't meet the requirements, assign error message.
      if (control instanceof FormGroup) {
        const nestedGroupMessages = this.invalidInputs(control);
        Object.assign(messages, nestedGroupMessages);
      }

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
    this._userService.getAuthUser().subscribe(user => {
        this.authUser = user;
        this.displayUser();      
    })
    // In memory API code
    // this.authUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  displayUser(): void {
    this.manageAccountForm.patchValue({
      forenames: this.authUser.forenames,
      surname: this.authUser.surname,
      email: this.authUser.email,
    });
  }

  updateUser(): void {
    const userToUpdate: IUser = {
      forenames: this.manageAccountForm.get("forenames").value,
      surname: this.manageAccountForm.get("surname").value,
      email: this.manageAccountForm.get("email").value,
      contactNumber: this.authUser.contactNumber ? this.authUser.contactNumber : "",
    };

    this._userService.updateUser(userToUpdate).subscribe((user) => {
      this._router
        .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
        .then(() => {
          this._router.navigate(["/myaccount"]);
        });
    });
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }

  updatePassword(): void {
    
    const passwords: IPasswords = {
      currentPassword: this.manageAccountForm.get("currentPassword").value,
      password: this.manageAccountForm.get("passwords.password").value,
      confirmPass: this.manageAccountForm.get("passwords.confirmPass").value
    }

    this._userService.updateUserPassword(passwords).subscribe(data => {
      this.successMessage = "Your password was successfully updated."
          setTimeout (() => {
            this.successMessage = '';
        }, 2500);

       this.afterSave();
    },
    error => {
      this.error = error;
      setTimeout (() => {
        this.error = '';
     }, 2500);
    })
  }

  afterSave(): void {
    this.manageAccountForm.patchValue({
      currentPassword: '',
      passwords: { password: '', confirmPass: ''},
    });
    this.manageAccountForm.markAsPristine();
    this.manageAccountForm.markAsUntouched();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
