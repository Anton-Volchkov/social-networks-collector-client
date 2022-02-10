import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ScrollToTopComponent } from '../base/scroll-to-top/scroll-to-top.component';
import {MultipleErrorsDialog} from "../dialogs/mupltiple-errors-dialog/multiple-errors-dialog.component";
import { AddNewSubscriptionsGroupDialogComponent } from '../dialogs/add-new-subscriptions-group-dialog/add-new-subscriptions-group-dialog.component';

@NgModule({
  declarations: [
    PagesComponent,
    ConfirmDialogComponent,
    MultipleErrorsDialog,
    ScrollToTopComponent,
    AddNewSubscriptionsGroupDialogComponent
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class PagesModule { }
