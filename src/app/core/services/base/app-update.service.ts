import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/content/dialogs/confirm-dialog/confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate, private dialog: MatDialog, private translate: TranslateService) {
    this.updates?.available?.subscribe(event => {
      this.showAppUpdateAlert();
    });
  }
  private showAppUpdateAlert() {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: "25vw",
      data: { dialogTitle: this.translate.instant("MODALS.APP_UPDATE.TITLE"), confirmationText: this.translate.instant("MODALS.APP_UPDATE.TEXT") }
    }).afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.doAppUpdate();
      }
    });
  }
  private doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
