import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, CanActivate, Route } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivateChild, CanActivate {

  constructor(private router: Router) { }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.hasAccessToken()) {
      this.redirectToLogin();
      return false;
    }

    return true;
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.hasAccessToken()) {
      this.redirectToLogin();
      return false;
    }

    return true;
  }

  private hasAccessToken(): boolean {
    return localStorage.getItem("access_token") != null;
  }

  private redirectToLogin() {
    this.router.navigateByUrl("/login");
  }
}
