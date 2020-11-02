import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "@app/_helpers/customValidators";
import { User } from "@app/_models/user";
import { AuthenticationService, UserService } from "@app/_services";
import { InMemoryUserService } from "@app/_services/inMemoryUser.service";
import { debounceTime } from "rxjs/operators";

@Component({
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  message: { [key: string]: string } = {};
  invalidSubmit: boolean = false;
  loading: boolean = false;
  error: string = "";

  validationMessages: {} = {
    forenames: {
      required: "Your forenames are required.",
      minlength: "Your forenames need to be at least 1 character long.",
      multipleSpaceValidator: "Your forenames cannot contain multiple spaces.",
      maxlength: "Your first name cannot be longer than 100 characters",
      noNumbers: "Your first name cannot contain any numbers",
      noSpecialChar: "Your first name cannot contain any special characters",
      spaceStart: "Your forename cannot start with a space"
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
    private _myInMemService: InMemoryUserService,
    private _userService: UserService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      forenames: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          CustomValidators.multipleSpaceValidator,
          CustomValidators.noSpecialChars,
          CustomValidators.noNumbers,
          CustomValidators.spaceStartValidator
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
          confirmPass: ["", Validators.required],
        },
        { validator: CustomValidators.passwordCompare }
      ),
    });

    this.registrationForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(
        (value) => (this.message = this.invalidInputs(this.registrationForm))
      );
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
        // return messages;
      }

      // If the password field doesn't meet the requirements, assign error message.
      if (control instanceof FormGroup) {
        const nestedGroupMessages = this.invalidInputs(control);
        Object.assign(messages, nestedGroupMessages);
        // return messages;
      }

      // If any of the other fields don't meet the requirements, assign error message.
      if (this.validationMessages[input]) {
        messages[input] = "";
        if (control.errors && (control.dirty || control.touched)) {
          Object.keys(control.errors).map((messageKey) => {
            messages[input] = this.validationMessages[input][messageKey];
          });
          // return messages;
        }
      }
    }
    return messages;
  }

  onSubmit(): void {
    this.loading = true;

    if (!this.registrationForm.valid) {
      this.invalidSubmit = true;
      setTimeout (() => {
        this.invalidSubmit = false;
     }, 1800);
      this.loading = false;
      return;
    }

    const user = new User(
      this.registrationForm.get("forenames").value.trim(),
      this.registrationForm.get("surname").value.trim(),
      this.registrationForm.get("email").value.trim(),
      this.registrationForm.get("passwords.password").value.trim(),
      this.registrationForm.get("passwords.confirmPass").value.trim()
    );

    this._userService.createUser(user).pipe().subscribe(data => {
      console.log(data);
    })

    // In Memory API backend for testing
    // this._myInMemService
    //   .saveUser(user)
    //   .pipe()
    //   .subscribe((data) => {
    //     console.log(data);
    //     this._router.navigate(["login"]);
    //     this.loading = false;
    //   });
    setTimeout (() => {
      this._authenticationService
      .login(user.email, user.password)
      .pipe()
      .subscribe(
        (data) => {
          this._router.navigate(["myadverts"]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
   }, 3000);
  
  }

  onClick(): void {
    this._userService
      .getAll()
      .pipe()
      .subscribe((data) => {
        console.log(data);
      });
  }
}
