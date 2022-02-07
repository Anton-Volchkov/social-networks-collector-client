import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Output, Input, Component } from "@angular/core";
import { ComponentBase } from "./component-base";

@Component({
  template: ''
})
export abstract class EntityDetailsComponent extends ComponentBase {
  @Input() @Output()
  public submitted: boolean = false;

  public isClosed: boolean = false;
  public isReadonly: boolean = false;

  public detailsForm: FormGroup = new FormGroup({});

  get f() {
    return this.detailsForm.controls;
  }

  constructor(
    protected route: ActivatedRoute,
    protected fb: FormBuilder
  ) {
    super();

  }

  protected getFormValue(formField: string): any {
    return this.detailsForm.get(formField)?.value
  }

  protected setFormValue(formField: string, value: any): void {
    return this.detailsForm.get(formField)?.patchValue(value);
  }


  protected validateAllFormFields(formGroup: FormGroup): boolean {
    if (!formGroup || !formGroup.controls) {
      return false;
    }

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

    this.logValidationErrors(formGroup);
    return formGroup.valid;
  }

  /**
   * Saves the details form.
   */
  protected abstract saveInternal(): any;

  protected preValidate(preValidationFunction?: Function): void {
    if (preValidationFunction) {
      preValidationFunction();
    }
  }

  /**
   * Validates the current form and calls the saveInternal() function. Do not overrides this method unless absolutely necessary.
   */
  public save(preValidationFunction?: Function, shouldRedirect: boolean = true): void {
    this.preValidate(preValidationFunction);

    if (!this.validate()) {
      return;
    }

    this.saveInternal();
  }

  public resetForm(resetSubmitted: boolean = false) {
    this.detailsForm.reset();

    this.submitted = !resetSubmitted;
  }

  public validate(): boolean {
    this.submitted = true;

    return (this.validateAllFormFields(this.detailsForm) && this.detailsForm.valid);
  }

  /**
   * Logs all validation errors to the console.
   */
  private logValidationErrors(form: FormGroup) {
    if (!form || !form.controls) {
      return;
    }
    if (!form.valid) {
      // console.error("Form invalid!");
    }

    Object.keys(form.controls).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors)
          .forEach(() => {
            // console.log("Key control: " + key + ", keyError: " + keyError + ", err value: ", controlErrors[keyError]);
          });
      }
    });
  }

}
