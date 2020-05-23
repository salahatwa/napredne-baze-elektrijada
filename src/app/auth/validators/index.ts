import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

const passwordMismatch: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.value !== confirmPassword.value) {
    return {
      passwordMismatch: true,
    };
  }
};

export default {
  passwordMismatch,
};
