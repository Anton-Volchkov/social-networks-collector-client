import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/auth/guards/auth.guard";
import { PagesComponent } from "./pages.component";


const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "login",
        loadChildren: () => import("./login/login.module").then(o => o.LoginModule)
      },
      {
        path: "registration",
        loadChildren: () => import("./registration/registration.module").then(o => o.RegistrationModule)
      },
      {
        path: "news",
        canActivate: [AuthGuard],
        loadChildren: () => import("./main/main.module").then(o => o.MainModule)
      },
      {
        path: "**",
        redirectTo: "/login",
        pathMatch: "full"
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
