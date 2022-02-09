import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { ChannelsService, NetworkType } from 'src/app/core/services/snc';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent extends EntityDetailsComponent implements OnInit {
  public networks = Object.values(NetworkType);

  constructor(route: ActivatedRoute, fb: FormBuilder, private channelsService: ChannelsService) {
    super(route, fb)
  }

  ngOnInit(): void {
    this.createForm();
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
        },
        complete: () => {
          this.f.channelName.reset();
        }
      }
    )
  }

}
