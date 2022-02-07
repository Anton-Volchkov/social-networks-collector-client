import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
        path: "news",
        loadChildren: () => import("./main/main.module").then(o => o.MainModule)
      },
      {
        path: "**",
        redirectTo: "/news",
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
