import { FormControl, Validators } from '@angular/forms';

export class CustomValidators {
  static passwordValidator(): Validators {
    return (control: FormControl) => {
      const value: string = control.value;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const valid = hasUppercase && hasLowercase && hasSpecial;
      return valid ? null : { invalidPassword: true };
    };
  }

  static whitespaceValidator(): Validators {
    return (control: FormControl) => {
      const value: string = control.value;
      const hasWhitespace = /\s/.test(value);
      return hasWhitespace ? { whitespaceError: true } : null;
    };
  }
}
