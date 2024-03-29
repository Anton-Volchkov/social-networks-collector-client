import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { UsersService } from 'src/app/core/services/snc';
import { singleEmailValidator } from 'src/app/core/validators/email.validator';
import { checkPasswords } from 'src/app/core/validators/passwords-same.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends EntityDetailsComponent implements OnInit {
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  @ViewChild("passwordInput", { static: false }) private passwordInput: ElementRef;
  @ViewChild("confirmPasswordInput", { static: false }) private confirmPasswordInput: ElementRef;

  constructor(
    route: ActivatedRoute,
    fb: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService) {
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
    }).pipe(takeUntil(this.unsubscribe)).subscribe((userId) => {
      if (userId) {
        this.toastr.success(this.translate.instant("MESSAGES.LOGIN_AFTER_REGISTER"), this.translate.instant("MESSAGES.SUCCESS"));
        this.router.navigateByUrl("registration/confirmation", { state: { emailOrLogin: form.login } });
      }
      else {
        this.resetForm(true);
      }
    });
  }

  public confirmPasswordVisibilityClickedHandler(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.hideConfirmPassword = !this.hideConfirmPassword;

    this.setCaretToPosition(this.confirmPasswordInput, this.confirmPasswordInput.nativeElement.value.length);
  }

  public passwordVisibilityClickedHandler(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.hidePassword = !this.hidePassword;

    this.setCaretToPosition(this.passwordInput, this.passwordInput.nativeElement.value.length);
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      email: [null, [Validators.maxLength(256), Validators.required, singleEmailValidator()]],
      login: [null, [Validators.required, Validators.maxLength(256)]],
      password: [null, [Validators.required, Validators.maxLength(256)]],
      confirmPassword: [null, [Validators.required, Validators.maxLength(256)]],
    }, { validators: checkPasswords });
  }
}
