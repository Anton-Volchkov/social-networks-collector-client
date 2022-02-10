
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./components/main/main.component";
import { MainBoardComponent } from './components/main-board/main-board.component';
import { HeaderComponent } from "../shared/header/header.component";
import { SubscribesComponent } from './components/subscribes/subscribes.component';

@NgModule({
  declarations: [
    MainComponent,
    MainBoardComponent,
    HeaderComponent,
    SubscribesComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class MainModule { }
