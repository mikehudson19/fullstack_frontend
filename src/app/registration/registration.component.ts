import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "@app/_helpers/customValidators";
import { User } from '@app/_models/user';
import { InMemoryUserService } from '@app/_services/inMemoryUser.service';
import { debounceTime } from "rxjs/operators";

@Component({
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  message: { [key: string]: string } = {};

  validationMessages: {} = {
    forenames: {
      required: "Your forenames are required.",
      minlength: "Your forenames need to be at least 1 character long.",
      spaceStart: "Your fornames cannot start with a space.",
      maxlength: "Your first name cannot be longer than 100 characters",
      noNumbers: "Your first name cannot contain any numbers.",
      noSpecialChar: "Your first name cannot contain any special characters",
    },
    surname: {
      required: "Your surname is required.",
      minlength: "Your surname needs to be at least 3 characters long.",
      noSpaceValidator: "Your surname cannot contain spaces.",
      maxlength: "Your surname cannot be longer than 100 characters",
      noNumbers: "Your surname cannot contain any numbers.",
      noSpecialChar: "Your surname cannot contain any special characters",
    },
    email: {
      required: "Your email address is required.",
      minlength: "Your email address must be at least 6 characters long",
      noSpaceValidator: "Your email address cannot contain spaces.",
      email: 'This must be a valid email address.',
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
      passwordNumber: 'Your password must contain at least one number.',
      passwordUpperCase: 'Your password must contain at leat one uppercase character.',
    },
    confirmPass: {
      required: "Please confirm your password.",
    },
  };

  constructor(private _formBuilder: FormBuilder,
              private _myInMemService: InMemoryUserService) {}

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      forenames: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
          CustomValidators.spaceStartValidator,
          CustomValidators.noSpecialChars,
          CustomValidators.noNumbers
        ],
      ],
      surname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          CustomValidators.noSpaceValidator,
          CustomValidators.noSpecialChars,
          CustomValidators.noNumbers
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
          CustomValidators.noSpaceValidator,
          Validators.email
        ],
      ],
      passwords: this._formBuilder.group({
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(100),
            CustomValidators.noSpaceValidator,
            CustomValidators.passwordNumber,
            CustomValidators.passwordUpperCase
          ],
        ],
        confirmPass: ["", Validators.required],
      }, 
      { validator: CustomValidators.passwordCompare})
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

    const user = new User(
      1,
      this.registrationForm.get('forenames').value,
      this.registrationForm.get('surname').value,
      this.registrationForm.get('email').value,
      this.registrationForm.get('passwords.password').value,
      this.registrationForm.get('passwords.confirmPass').value
    );

    console.log(user);

  }

}
