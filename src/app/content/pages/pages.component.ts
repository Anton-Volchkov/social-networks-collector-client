import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "pages",
  templateUrl: "./pages.component.html",
  changeDetection: ChangeDetectionStrategy.Default
})
export class PagesComponent implements OnInit {

  constructor(
    private el: ElementRef,

  ) {

  }

  public ngOnInit(): void { }

}
