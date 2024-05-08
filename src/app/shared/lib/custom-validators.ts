import { AbstractControl } from '@angular/forms';

export const customValidators = {
  passwordMatch(control: AbstractControl) {
    return control.get('password').value ===
      control.get('confirmPassword').value
      ? null
      : { passwordMismatch: true };
  },
  newPasswordSame(control: AbstractControl) {
    return control.get('oldPassword').value !== control.get('newPassword').value
      ? null
      : { newPasswordSame: true };
  },
  checkDeviceIdValidator(control: AbstractControl) {
    return control.get('deviceId').value !== this.deviceId
      ? { invalidDeviceId: true }
      : null;
  },
};
