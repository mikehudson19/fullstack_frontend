import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { debounceTime, first } from "rxjs/operators";

import { AuthenticationService } from "@app/_services";
import { InMemoryUserService } from "@app/_services/inMemoryUser.service";
import { CustomValidators } from "@app/_helpers/customValidators";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  message: { [key: string]: string } = {};
  fieldTextType: boolean = false;

  validationMessages: {} = {
    email: {
      required: "Your email address is required.",
      minlength: "Your email address must be at least 6 characters long",
      noSpaceValidator: "Your email address cannot contain spaces.",
      email: "This must be a valid email address.",
      maxlength: "Your email cannot be longer than 100 characters",
    },
    password: {
      required: "A password is required.",
    },
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _inMemUserService: InMemoryUserService
  ) {
    // redirect to home if already logged in
    if (this._authenticationService.currentUserValue) {
      this._router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: [
        "",
        [Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(100),
        CustomValidators.noSpaceValidator
    ],
      ],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams["returnUrl"] || "/";

    this.loginForm.valueChanges
      .pipe(debounceTime(600))
      .subscribe(
        (value) => (this.message = this.invalidInputs(this.loginForm))
      );
  }

  invalidInputs(formgroup: FormGroup) {
    let messages = {};
    console.log(formgroup.controls);
    for (const input in formgroup.controls) {
        console.log(input);
      const control = formgroup.controls[input];

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

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._router.navigate(["myadverts"]);
        },
        (error) => {
          this.error = error;
          setTimeout (() => {
            this.error = '';
         }, 1800);
          this.loading = false;
        }
      );
  }

  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}
