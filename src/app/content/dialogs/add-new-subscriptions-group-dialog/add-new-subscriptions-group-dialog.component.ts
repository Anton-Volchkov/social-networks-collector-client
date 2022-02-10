import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { SubscriptionsGroupService } from 'src/app/core/services/snc';

@Component({
  selector: 'app-add-new-subscriptions--group-dialog',
  templateUrl: './add-new-subscriptions-group-dialog.component.html',
  styleUrls: ['./add-new-subscriptions-group-dialog.component.scss']
})
export class AddNewSubscriptionsGroupDialogComponent extends EntityDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddNewSubscriptionsGroupDialogComponent>, route: ActivatedRoute, fb: FormBuilder, private subscriptionsGroupService: SubscriptionsGroupService) {
    super(route, fb);
  }

  ngOnInit(): void {
    this.createForm();
  }

  protected saveInternal() {
    let form = this.detailsForm.getRawValue();
    this.subscriptionsGroupService.addSubscriptionsGroup(form.groupName).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.close();
    });
  }

  public close() {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.dialogRef.close(true);
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      groupName: [null, Validators.required],
    });
  }
}
