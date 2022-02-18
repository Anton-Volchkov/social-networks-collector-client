import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ScrollToTopComponent } from '../base/scroll-to-top/scroll-to-top.component';
import { MultipleErrorsDialog } from "../dialogs/mupltiple-errors-dialog/multiple-errors-dialog.component";
import { AddSubscriptionToGroupDialogComponent } from '../dialogs/add-subscription-to-group-dialog/add-subscription-to-group-dialog.component';
import { ConfirmUnsubscribeFromGroupDialogComponent } from '../dialogs/confirm-unsubscribe-from-group-dialog/confirm-unsubscribe-from-group-dialog.component';
import { M3u8ReaderComponent } from './shared/m3u8-reader/m3u8-reader.component';
import { UpsertSubscriptionsGroupDialogComponent } from '../dialogs/upsert-subscriptions-group-dialog/upsert-subscriptions-group-dialog.component';
import { LinksPreviewComponent } from './shared/links-preview/links-preview.component';

@NgModule({
  declarations: [
    AddSubscriptionToGroupDialogComponent,
    ConfirmUnsubscribeFromGroupDialogComponent,
    PagesComponent,
    ConfirmDialogComponent,
    MultipleErrorsDialog,
    ScrollToTopComponent,
    UpsertSubscriptionsGroupDialogComponent,
    M3u8ReaderComponent,
    LinksPreviewComponent
  ],
    exports: [
        M3u8ReaderComponent,
        LinksPreviewComponent
    ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class PagesModule { }
