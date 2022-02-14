import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { UsersService } from 'src/app/core/services/snc';
import { checkPasswords } from 'src/app/core/validators/passwords-same.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends EntityDetailsComponent implements OnInit {
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  constructor(route: ActivatedRoute, fb: FormBuilder, private userService: UsersService, private router: Router) {
    super(route, fb);
  }

  ngOnInit(): void {
    this.createForm();
  }

  protected saveInternal() {
    let form = this.detailsForm.getRawValue();

    this.userService.registerUser({
      login: form.login,
      email: form.email,
      password: form.password
    }).pipe(takeUntil(this.unsubscribe)).subscribe((response) => {
      if (response?.isSuccess) {
        this.router.navigateByUrl("/login");
      }
      else {
        this.resetForm(true);
      }
    });
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      email: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    }, { validators: checkPasswords });
  }
}
