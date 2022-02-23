import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  let pass = group.get('password');
  let confirmPass = group.get('confirmPassword')

  if (pass.value == confirmPass.value) {
    removeErrors(pass);
    removeErrors(confirmPass);
  }
  else {
    pass.setErrors({ ...pass.errors, notSame: true });
    confirmPass.setErrors({ ...confirmPass.errors, notSame: true });
  }

  return null;
}

function removeErrors(control: AbstractControl) {
  if (!control?.errors) {
    return;
  }

  if (control?.errors && control.hasError("notSame")) {
    delete control?.errors["notSame"];
  }

  if (!control?.errors || Object.keys(control?.errors).length === 0) {
    control.setErrors(null);
  }
}
