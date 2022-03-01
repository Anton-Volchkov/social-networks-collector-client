import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { SubscriptionsGroupService } from 'src/app/core/services/snc';

export class UpsertSubscriptionsGroupDialogComponentData {
  public groupName: string;
  public groupId: number;
}

@Component({
  selector: 'upsert-new-subscriptions-group-dialog',
  templateUrl: './upsert-subscriptions-group-dialog.component.html',
  styleUrls: ['./upsert-subscriptions-group-dialog.component.scss']
})
export class UpsertSubscriptionsGroupDialogComponent extends EntityDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpsertSubscriptionsGroupDialogComponent>,
    route: ActivatedRoute,
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UpsertSubscriptionsGroupDialogComponentData,
    private subscriptionsGroupService: SubscriptionsGroupService) {
    super(route, fb);
  }

  ngOnInit(): void {
    this.createForm();

    if (!this.isNew()) {
      this.f.groupName.setValue(this.data.groupName);
    }

  }

  protected saveInternal() {
    let form = this.detailsForm.getRawValue();

    if (this.isNew()) {
      this.subscriptionsGroupService.addSubscriptionsGroup(form.groupName).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        this.confirm();
      });
    }
    else {
      this.subscriptionsGroupService.updateSubscriptionsGroup(this.data.groupId, form.groupName).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        this.confirm();
      });
    }
  }

  public close() {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.dialogRef.close(true);
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      groupName: [null, [Validators.required, Validators.maxLength(256)]],
    });
  }

  private isNew(): boolean {
    return this.data == null || !this.data?.groupId;
  }
}
