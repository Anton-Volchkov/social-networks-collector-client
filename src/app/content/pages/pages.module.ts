import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    PagesComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class PagesModule { }
