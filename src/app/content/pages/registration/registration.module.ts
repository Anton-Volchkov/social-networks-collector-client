
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./components/registration/registration.component";
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { EmailConfirmedComponent } from './components/email-confirmed/email-confirmed.component';


@NgModule({
  declarations: [RegistrationComponent, EmailConfirmationComponent, EmailConfirmedComponent],
  imports: [
    RegistrationRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class RegistrationModule { }
