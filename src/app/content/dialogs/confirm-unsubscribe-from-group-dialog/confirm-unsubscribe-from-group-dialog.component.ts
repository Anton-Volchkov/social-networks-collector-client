import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { SubscriptionsGroupService, SubscriptionsService } from 'src/app/core/services/snc';

export class ConfirmUnsubscribeFromGroupDialogComponentData {
  public groupName: string;
  public subscriptionId: number;
}

export class ConfirmUnsubscribeFromGroupDialogComponentResponse {
  public isClosed: boolean;
  public unsubscriptionType: UnsubscriptionType;
}

export enum UnsubscriptionType {
  OnlyGroup = 0,
  Global = 1,
}

@Component({
  selector: 'app-confirm-unsubscribe-from-group-dialog',
  templateUrl: './confirm-unsubscribe-from-group-dialog.component.html',
  styleUrls: ['./confirm-unsubscribe-from-group-dialog.component.scss']
})
export class ConfirmUnsubscribeFromGroupDialogComponent extends EntityDetailsComponent implements OnInit {
  public unsubscriptionType: typeof UnsubscriptionType = UnsubscriptionType;

  constructor(public dialogRef: MatDialogRef<ConfirmUnsubscribeFromGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmUnsubscribeFromGroupDialogComponentData,
    route: ActivatedRoute,
    fb: FormBuilder,
    private subscriptionsGroupService: SubscriptionsGroupService,
    private subscriptionsService: SubscriptionsService) {
    super(route, fb);
  }
  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      unsubscriptionType: [UnsubscriptionType.OnlyGroup, Validators.required]
    });

  }

  protected saveInternal() {
    let form = this.detailsForm.getRawValue();

    if (form.unsubscriptionType === UnsubscriptionType.OnlyGroup) {
      this.subscriptionsGroupService.deleteSubscriptionFromSubscriptionsGroup(this.data.groupName, this.data.subscriptionId).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        this.confirm();
      });
    }
    else {
      this.subscriptionsService.unsubscribe(this.data.subscriptionId).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        this.confirm();
      })
    }
  }


  public close() {
    this.dialogRef.close({ isClosed: true });
  }

  public confirm() {
    this.dialogRef.close({ isClosed: false, unsubscriptionType: this.f?.unsubscriptionType?.value });
  }

}
