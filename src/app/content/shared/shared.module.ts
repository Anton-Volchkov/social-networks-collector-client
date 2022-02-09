import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe, DatePipe } from "@angular/common";
import { MaterialModule } from "../../material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    NgSelectModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    NgbModule,
    NgSelectModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    TranslateModule
  ]
})
export class SharedModule {
  public static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        DecimalPipe,
        DatePipe,
        MatDialog,
      ]
    };
  }
}
