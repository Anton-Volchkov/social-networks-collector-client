import { DOCUMENT, ViewportScroller } from "@angular/common";
import {
  Component,
  Inject,
  OnInit
} from "@angular/core";
import { fromEvent, map, Observable, takeUntil } from "rxjs";
import { ComponentBase } from "src/app/core/components/abstractions/component-base";

@Component({
  selector: "pages",
  templateUrl: "./pages.component.html",
})
export class PagesComponent extends ComponentBase implements OnInit {

  constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly viewport: ViewportScroller) {
    super();
  }

  public ngOnInit(): void { }


  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    takeUntil(this.unsubscribe),
    map(() => this.viewport.getScrollPosition()?.[1] > 200)
  );

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
