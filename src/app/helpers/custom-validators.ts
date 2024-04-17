import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function passwordValidator(): Validators {
  return (control: FormControl) => {
    const value: string = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const valid = hasUppercase && hasLowercase && hasSpecial;
    return valid ? null : { invalidPassword: true };
  };
}

export function whitespaceValidator(): Validators {
  return (control: FormControl) => {
    const value: string = control.value;
    const hasWhitespace = /\s/.test(value);
    return hasWhitespace ? { whitespaceError: true } : null;
  };
}

// export function mobileValidator(validators: ValidatorFn[]): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     // get the value and assign it to a new form control
//     const propertyVal = control.value && control.value[property];
//     const newFc = new FormControl(propertyVal);
//     // run the validators on the new control and keep the ones that fail
//     const failedValidators = validators.map((v) => v(newFc)).filter((v) => !!v);
//     // if any fail, return the list of failures, else valid
//     return failedValidators.length
//       ? { invalidProperty: failedValidators }
//       : null;
//   };
// }

export function mv(): Validators {
  return (control: FormControl) => {
    const mobileVal = control.value && control.value['mobile'];
    const countryCodeVal = control.value && control.value['countrycode'];

    if (countryCodeVal === '+52') {
      if (mobileVal.length === 10) {
        return null;
      }
      return { invalidMobile: true };
    } else return { invalidMobile: true };
  };
}
