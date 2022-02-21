import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { AddSubscriptionToGroupDialogComponent, SubscriptionType } from 'src/app/content/dialogs/add-subscription-to-group-dialog/add-subscription-to-group-dialog.component';
import { ConfirmDialogComponent } from 'src/app/content/dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmUnsubscribeFromGroupDialogComponent, ConfirmUnsubscribeFromGroupDialogComponentResponse, UnsubscriptionType } from 'src/app/content/dialogs/confirm-unsubscribe-from-group-dialog/confirm-unsubscribe-from-group-dialog.component';
import { UpsertSubscriptionsGroupDialogComponent } from 'src/app/content/dialogs/upsert-subscriptions-group-dialog/upsert-subscriptions-group-dialog.component';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { CurrentGroupService } from 'src/app/core/services/current-group/current-group.service';
import { SubscriptionsGroupDTO, NetworkType, SubscriptionsGroupService, SubscriptionsService, UserSubscriptionDTO } from 'src/app/core/services/snc';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent extends EntityDetailsComponent implements OnInit {

  @Output()
  public groupSelected: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public defaultGroupName: string = null;

  public networks = Object.values(NetworkType);
  public userSubscriptions: UserSubscriptionDTO[] = [];
  public groupSubscriptions: SubscriptionsGroupDTO[] = [];
  public isMobileDevice: boolean = false;
  public currentGroupName: string = null;

  constructor(route: ActivatedRoute, fb: FormBuilder,
    private currentGroupService: CurrentGroupService,
    private subscriptionsGroupService: SubscriptionsGroupService,
    private subscriptionsService: SubscriptionsService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private toastr: ToastrService) {
    super(route, fb)
  }

  ngOnInit(): void {
    this.createForm();
    this.loadSubscriptions();
    this.isMobileDevice = this.isMobile();
    this.currentGroupService.observeCurrentGroupChanged().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.currentGroupName = data;
    });
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      networkType: ["Telegram", Validators.required],
      channelName: [null, Validators.required],
    });
  }

  protected saveInternal() {
    let formValue = this.detailsForm.getRawValue();

    this.subscriptionsService.subscribe(formValue.networkType, formValue.channelName).pipe(takeUntil(this.unsubscribe)).subscribe(
      {
        error: () => {
          this.f.channelName.reset();
          this.resetSubmit();
        },
        complete: () => {
          this.f.channelName.reset();
          this.resetSubmit();
          this.loadSubscriptions();

          if (!this.currentGroupName) {
            this.viewGroupMessages();
          }
        }
      }
    )
  }

  private getMinWidthForModalDialog(): string {
    return this.isMobileDevice ? "90vw" : "30vw";
  }
  public unsubscribeChannel(subscription: UserSubscriptionDTO) {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: this.getMinWidthForModalDialog(),
      data: { dialogTitle: this.translate.instant("MODALS.CONFIRM.TITLE"), confirmationText: this.translate.instant("MODALS.CONFIRM.UNSUBSCRIBE") }
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.subscriptionsService.unsubscribe(subscription.id).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
          const subscriptionRelatedToCurrentGroup = this.subscriptionRelatedToCurrentGroup(subscription.id);

          if (!this.currentGroupName || subscriptionRelatedToCurrentGroup) {
            this.viewGroupMessages(this.currentGroupName);
          }
          this.loadSubscriptions();

          this.toastr.success(this.translate.instant("MESSAGES.UNSUBSCRIBE_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
        });
      }
    });
  }

  public subscriptionRelatedToCurrentGroup(subscriptionId: number): boolean {
    const currentGroup = this.groupSubscriptions.find(x => x.groupName === this.currentGroupName);

    if (currentGroup === null) {
      return false;
    }

    return currentGroup.subscriptions.find(x => x.id == subscriptionId) != null;
  }

  public viewGroupMessages(groupName: string = null) {
    this.currentGroupName = groupName;

    this.groupSelected.emit(groupName);
  }

  public addSubscriptionToGroup(groupName: string) {
    this.dialog.open(AddSubscriptionToGroupDialogComponent,
      {
        height: 'auto',
        disableClose: true,
        autoFocus: false,
        minWidth: this.getMinWidthForModalDialog(),
        data: {
          groupName
        }
      }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
        if (!result.isClosed) {

          this.loadSubscriptions();

          if (result.subscriptionType === SubscriptionType.NewSubscription && !this.currentGroupName) {
            this.viewGroupMessages();

          }
          else {
            if (groupName === this.currentGroupName)
              this.viewGroupMessages(groupName);
          }

          this.toastr.success(this.translate.instant("MESSAGES.ADD_SUBSCRIPTION_TO_GROUP_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
        }
      });
  }

  public addNewGroup() {
    this.dialog.open(UpsertSubscriptionsGroupDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: this.getMinWidthForModalDialog(),
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result) {
        this.loadSubscriptions();
        this.toastr.success(this.translate.instant("MESSAGES.GROUP_ADDED_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
      }
    });
  }

  public editGroup(group: SubscriptionsGroupDTO) {
    this.dialog.open(UpsertSubscriptionsGroupDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: this.getMinWidthForModalDialog(),
      data: {
        groupName: group.groupName,
        groupId: group.id
      }
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
      if (result) {
        this.loadSubscriptions();
        this.toastr.success(this.translate.instant("MESSAGES.EDIT_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
      }
    });
  }

  public refresh() {
    this.viewGroupMessages(this.currentGroupName);
  }

  public unsubscribeGroupChannel(groupName: string, subscription: UserSubscriptionDTO) {
    this.dialog.open(ConfirmUnsubscribeFromGroupDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: this.getMinWidthForModalDialog(),
      data: { groupName, subscriptionId: subscription.id }
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe((result: ConfirmUnsubscribeFromGroupDialogComponentResponse) => {
      if (!result.isClosed) {

        if (result.unsubscriptionType == UnsubscriptionType.Global) {
          if (!this.currentGroupName || groupName == this.currentGroupName) {
            this.viewGroupMessages();
          }
        }
        else {
          if (groupName == this.currentGroupName) {
            this.viewGroupMessages(this.currentGroupName);
          }
        }
        this.loadSubscriptions();

        this.toastr.success(this.translate.instant("MESSAGES.UNSUBSCRIBE_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
      }
    });
  }

  private loadSubscriptions() {
    this.subscriptionsService.subscriptions().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.userSubscriptions = data ?? [];
    });

    this.subscriptionsGroupService.groupSubscriptions().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      this.groupSubscriptions = data ?? [];
    })
  }

  public deleteGroup(group: SubscriptionsGroupDTO) {
    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      autoFocus: false,
      minWidth: this.getMinWidthForModalDialog(),
      data: { dialogTitle: this.translate.instant("MODALS.CONFIRM.TITLE"), confirmationText: this.translate.instant("MODALS.CONFIRM.DELETE_GROUP") }
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(result => {
      if (result) {
        this.subscriptionsGroupService.deleteSubscriptionGroup(group.id).pipe(takeUntil(this.unsubscribe)).subscribe((result) => {
          if (result) {
            if (this.currentGroupName == group.groupName) {
              this.currentGroupName = null;
            }

            this.loadSubscriptions();

            this.toastr.success(this.translate.instant("MESSAGES.DELETE_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
          }
        });
      }
    });
  }

  public resetDefaultSubscriptionGroup() {
    this.subscriptionsGroupService.resetDefaultSubscriptionGroup().pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.defaultGroupName = null;
      this.toastr.success(this.translate.instant("MESSAGES.SET_DEFAULT_GROUP_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
    });
  }

  public setSubscriptionGroupAsDefault(group: SubscriptionsGroupDTO) {
    this.subscriptionsGroupService.setDefaultSubscriptionGroup(group.id).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.defaultGroupName = group.groupName;
      this.toastr.success(this.translate.instant("MESSAGES.SET_DEFAULT_GROUP_SUCCESS"), this.translate.instant("MESSAGES.SUCCESS"));
    });
  }

  private isMobile() {
    let check = false;
    let myWindow: any = window;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || myWindow.opera);
    return check;
  };
}
