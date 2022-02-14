import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CurrentGroupService {
  private currentGroupChanged: Subject<string> = new Subject<string>();

  constructor() { }

  public notifyCurrentGroupChanged(groupName: string) {
    this.currentGroupChanged.next(groupName);
  }

  public observeCurrentGroupChanged() {
    return this.currentGroupChanged.asObservable();
  }
}
