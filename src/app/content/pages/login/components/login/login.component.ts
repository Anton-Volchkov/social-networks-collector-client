import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, switchMap, takeUntil} from 'rxjs';
import {EntityDetailsComponent} from 'src/app/core/components/abstractions/entity-details.component';
import {LoginDTO, UsersService} from 'src/app/core/services/snc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends EntityDetailsComponent implements OnInit {
  public hidePassword: boolean = true;

  @ViewChild("passwordInput", { static: false }) private passwordInput: ElementRef;

  constructor(route: ActivatedRoute, fb: FormBuilder, private userService: UsersService, private router: Router) {
    super(route, fb);
  }

  public changePasswordVisibilityClickedHandler(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.hidePassword = !this.hidePassword;

    this.setCaretToPosition(this.passwordInput, this.passwordInput.nativeElement.value.length);
  }

  protected saveInternal() {
    const loginDTO: LoginDTO = this.detailsForm.getRawValue();

    this.userService.emailConfirmed(loginDTO.emailOrLogin)
      .pipe(takeUntil(this.unsubscribe),
        switchMap((isConfirmed: boolean) => {

          if (!isConfirmed) {
            this.router.navigateByUrl("/registration/confirmation", { state: { emailOrLogin: loginDTO.emailOrLogin }});
            return EMPTY;
          }

          return this.userService.login(this.detailsForm.getRawValue()).pipe(takeUntil(this.unsubscribe));
        }))
      .subscribe({
      next: (token: string) => {
        if (token) {
          localStorage.setItem("access_token", token);
          this.router.navigateByUrl("/news");
        }

        this.resetForm(true);
      },
      error: () => {
        this.resetForm(true);
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      emailOrLogin: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
