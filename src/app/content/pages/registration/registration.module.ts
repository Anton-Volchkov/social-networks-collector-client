
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./components/registration/registration.component";


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    RegistrationRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class RegistrationModule { }
