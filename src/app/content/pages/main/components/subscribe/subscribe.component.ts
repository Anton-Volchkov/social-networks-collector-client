import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
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

  constructor(route: ActivatedRoute, fb: FormBuilder, private channelsService: ChannelsService) {
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
    this.channelsService.unsubscribe(channel.networkType!, channel.channelName!).pipe(takeUntil(this.unsubscribe)).subscribe(response => {

      this.loadChannels();
    });
  }


  private loadChannels() {
    this.channelsService.subscriptions().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.userChannels = data ?? [];
    });
  }
}
