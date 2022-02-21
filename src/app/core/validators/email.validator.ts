import { AbstractControl, ValidatorFn } from "@angular/forms";

export function multiEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = control.value != null && control.value.some(x => !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(x.value));

    return forbidden ? { email: { value: control.value } } : null;
  };
}

export function singleEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = control.value != null && control.value.length > 0 && !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(control.value);

    return forbidden ? { email: true } : null;
  };
}
