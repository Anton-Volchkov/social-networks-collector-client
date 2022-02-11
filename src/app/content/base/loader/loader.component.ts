import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from 'src/app/core/services/base/loader-service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public show: boolean = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.cdr.detectChanges();
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
