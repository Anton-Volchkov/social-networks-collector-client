import {Component, OnInit} from '@angular/core';
import {ComponentBase} from "../../../../../core/components/abstractions/component-base";
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.scss']
})
export class EmailConfirmedComponent extends ComponentBase implements OnInit {
  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => this.router.navigateByUrl("/login"), 5000);
  }
}
