import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "error-popup",
  templateUrl: "multiple-errors-dialog..component.html"
})
export class MultipleErrorsDialog {
  @Input()
  public data: any;

  constructor(public activeModal: NgbActiveModal) {
  }
}
