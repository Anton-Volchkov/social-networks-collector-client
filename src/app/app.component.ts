import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppUpdateService } from './core/services/base/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SNC';

  constructor(private translate: TranslateService, private updateService: AppUpdateService) {
    translate.setDefaultLang('en');
  }
}
