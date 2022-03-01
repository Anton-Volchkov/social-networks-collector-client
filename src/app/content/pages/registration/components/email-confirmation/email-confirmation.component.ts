import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, takeUntil} from "rxjs";
import {UsersService} from "../../../../../core/services/snc";
import {ComponentBase} from "../../../../../core/components/abstractions/component-base";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent extends ComponentBase {

  private readonly emailOrLogin: string;

  constructor(private router: Router, private usersService: UsersService, private toastrService: ToastrService, private translateService: TranslateService) {
    super();

    this.emailOrLogin = this.router.getCurrentNavigation().extras.state.emailOrLogin;
    console.log(this.emailOrLogin);
  }

  public resendEmail() {
    this.usersService.resendConfirmationEmail(this.emailOrLogin)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        this.toastrService.success(this.translateService.instant('MESSAGES.CONFIRMATION_EMAIL_SENT'));
      })
  }
}
