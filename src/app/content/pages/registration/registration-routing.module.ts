import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";
import {EmailConfirmationComponent} from "./components/email-confirmation/email-confirmation.component";
import {EmailConfirmedComponent} from "./components/email-confirmed/email-confirmed.component";


const routes: Routes = [{
  path: "",
  component: RegistrationComponent,
  },
  {
    path: "confirmation",
    component: EmailConfirmationComponent,
  },
  {
    path: "email-confirmed",
    component: EmailConfirmedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
