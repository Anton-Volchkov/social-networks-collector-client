import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/content/dialogs/confirm-dialog/confirm-dialog.component';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { ChannelsService, NetworkType } from 'src/app/core/services/snc';
import { UserChannelDTO } from 'src/app/core/services/snc/model/userChannelDTO';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent extends EntityDetailsComponent implements OnInit {
  public networks = Object.values(NetworkType);
  public userChannels: UserChannelDTO[] = [];

  constructor(route: ActivatedRoute, fb: FormBuilder,
    private channelsService: ChannelsService,
    private dialog: MatDialog,
    private translate: TranslateService) {
    super(route, fb)
  }

  ngOnInit(): void {
    this.createForm();
    this.loadChannels();
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      networkType: ["Telegram", Validators.required],
      channelName: [null, Validators.required],
    });
  }

  protected saveInternal() {
    let formValue = this.detailsForm.getRawValue();

    this.channelsService.subscribe(formValue.networkType, formValue.channelName).pipe(takeUntil(this.unsubscribe)).subscribe(
      {
        error: () => {
          this.f.channelName.reset();
          this.resetSubmit();
        },
        complete: () => {
          this.f.channelName.reset();
          this.resetSubmit();
          this.loadChannels();
        }
      }
    )
  }

  public unsubscribeChannel(channel: UserChannelDTO) {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: "25vw",
      data: { dialogTitle: this.translate.instant("MODALS.CONFIRM.TITLE"), confirmationText: this.translate.instant("MODALS.CONFIRM.UNSUBSCRIBE") }
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.channelsService.unsubscribe(channel.networkType!, channel.channelName!).pipe(takeUntil(this.unsubscribe)).subscribe(response => {

          this.loadChannels();
        });
      }
    });
  }


  private loadChannels() {
    this.channelsService.subscriptions().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.userChannels = data ?? [];
    });
  }
}
