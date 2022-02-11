import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/content/dialogs/confirm-dialog/confirm-dialog.component';
import { ComponentBase } from 'src/app/core/components/abstractions/component-base';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComponentBase implements OnInit {
  public isCollapsed = true;
  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService) {
    super();
  }

  ngOnInit(): void {
  }


  public logout() {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: "25vw",
      data: { dialogTitle: this.translate.instant("MODALS.CONFIRM.TITLE"), confirmationText: this.translate.instant("MODALS.CONFIRM.LOGOUT") }
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        localStorage.removeItem("access_token");
        this.router.navigateByUrl("/login");
      }
    });

  }
}
