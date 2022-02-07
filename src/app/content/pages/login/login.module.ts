
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";


@NgModule({
  declarations: [],
  imports: [
    LoginRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class LoginModule { }
