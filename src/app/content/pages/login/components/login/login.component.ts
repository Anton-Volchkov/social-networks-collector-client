import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EntityDetailsComponent } from 'src/app/core/components/abstractions/entity-details.component';
import { UsersService } from 'src/app/core/services/snc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends EntityDetailsComponent implements OnInit {
  public hidePassword: boolean = true;

  constructor(route: ActivatedRoute, fb: FormBuilder, private userService: UsersService, private router: Router) {
    super(route, fb);
  }

  protected saveInternal() {
    this.userService.login(this.detailsForm.getRawValue()).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (token) => {
        if (token) {
          localStorage.setItem("access_token", token);
          this.router.navigateByUrl("/news");
        }

        this.resetForm(true);
      },
      error: () => {
        this.resetForm(true);
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.detailsForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
