import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static noSpaceValidator(
    control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (/[\s]/.test(control.value)) {
        return { 'noSpaceValidator': true };
      }
      return null;
    }

    static multipleSpaceValidator(
      control: AbstractControl
      ): { [key: string]: boolean } | null {
        if (/[\s][\s]/.test(control.value)) {
          return { 'multipleSpaceValidator': true };
        }
        return null;
      }

    static spaceStartValidator(
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      if (/[\s]/.test(control.value[0])) {
        return { 'spaceStart': true };
      }
      return null;
    }

    static noSpecialChars (control: AbstractControl): { [key: string]: boolean } | null {
      if (/[!@#$%^&*(),.?":{}|<>±§_+~`=\/]/g.test(control.value)) {
        return { 'noSpecialChar' : true }
      }
      return null;
    }

    static noNumbers(control: AbstractControl): { [key: string]: boolean } | null {
      if (/[0-9]/.test(control.value)) {
        return { 'noNumbers' : true }
      }
      return null;
    }

    static onlyNumbers(control: AbstractControl): { [key: string]: boolean } | null {
      if (!/[0-9.]/.test(control.value)) {
        return { 'onlyNumbers' : true }
      }
      return null;
    }

    static passwordNumber(control: AbstractControl): { [key:  string]: boolean } | null {
      if (!/[0-9]/.test(control.value)) {
        return { 'passwordNumber' : true };
      }
      return null;
    }

    static passwordUpperCase(control: AbstractControl): { [key: string]: boolean } | null {
      if (!/[A-Z]/.test(control.value)) {
        return { 'passwordUpperCase': true }
      }
      return null;
    }

    static passwordCompare(
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      let password = control.get('password');
      let confirmPass = control.get('confirmPass');
    
      if (password.pristine || confirmPass.pristine) {
        return null;
      }
    
      if (password.value !== confirmPass.value) {
        return { 'match' : true }
      }
      return null;
    }

}