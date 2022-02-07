import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/core/auth/guards/auth.guard";
import { MainBoardComponent } from "./components/main-board/main-board.component";
import { MainComponent } from "./components/main/main.component";


const routes: Routes = [{
  path: "",
  component: MainBoardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: "",
      component: MainComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
