import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AbstractControl: AbstractControl):any{
    const password = AbstractControl.get('password').value;
    const confirmPassword = AbstractControl.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AbstractControl.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
