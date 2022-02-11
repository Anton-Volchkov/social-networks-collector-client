import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { NetworkType, SubscriptionsGroupService, SubscriptionsService, UserSubscriptionDTO } from 'src/app/core/services/snc';

export class AddSubscriptionToGroupDialogComponentData {
  public groupName: string;
}

export class AddSubscriptionToGroupDialogComponentResponse {
  public isClosed: boolean;
  public subscriptionType: SubscriptionType;
}

export enum SubscriptionType {
  ExistingSubscription = 0,
  NewSubscription = 1
}

@Component({
  selector: 'app-add-subscription-to-group-dialog',
  templateUrl: './add-subscription-to-group-dialog.component.html',
  styleUrls: ['./add-subscription-to-group-dialog.component.scss']
})
export class AddSubscriptionToGroupDialogComponent extends EntityDetailsComponent implements OnInit {
  public networks = Object.values(NetworkType);
  public activeSubscriptions: UserSubscriptionDTO[] = [];
  public subscriptionType: typeof SubscriptionType = SubscriptionType;

  constructor(public dialogRef: MatDialogRef<AddSubscriptionToGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddSubscriptionToGroupDialogComponentData,
    route: ActivatedRoute,
    fb: FormBuilder,
    private subscriptionsGroupService: SubscriptionsGroupService,
    private subscriptionsService: SubscriptionsService) {
    super(route, fb);
  }

  ngOnInit(): void {
    this.loadActiveSubscriptions();
    this.createForm();
  }

  protected saveInternal() {
    let form = this.detailsForm.getRawValue();

    if (this.isActiveSubscriptionsSelected()) {
      this.subscriptionsGroupService.addSubscriptionToSubscriptionsGroup(this.data.groupName, form.activeSubscription)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          this.confirm();
        });
    }
    else {

      this.subscriptionsService.subscribe(form.networkType, form.channelName).pipe(switchMap(data => {
        return this.subscriptionsGroupService.addSubscriptionToSubscriptionsGroup(this.data.groupName, data);
      }), takeUntil(this.unsubscribe)).subscribe(response => {
        this.confirm();
      });
    }
  }

  public close() {
    this.dialogRef.close({ isClosed: true });
  }

  public confirm() {
    this.dialogRef.close({ isClosed: false, subscriptionType: this.f?.subscriptionType?.value });
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      subscriptionType: [SubscriptionType.ExistingSubscription, Validators.required],
      activeSubscription: [null, Validators.required],
      networkType: [{ disabled: true, value: "Telegram" }, Validators.required],
      channelName: [{ disabled: true, value: null }, Validators.required],
    });

    this.f.subscriptionType.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((data: SubscriptionType) => {
      if (data === SubscriptionType.ExistingSubscription) {
        this.f.activeSubscription.enable();

        this.f.networkType.disable();
        this.f.channelName.disable();
      }
      else {
        this.f.activeSubscription.disable();

        this.f.networkType.enable();
        this.f.channelName.enable();
      }

      this.detailsForm.updateValueAndValidity();
    })
  }

  public isActiveSubscriptionsSelected() {
    return this.f?.subscriptionType?.value === SubscriptionType.ExistingSubscription;
  }

  private loadActiveSubscriptions() {
    this.subscriptionsGroupService.getValidActiveSubscriptionsForGroup(this.data.groupName).pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.activeSubscriptions = data ?? [];
    });
  }
}
