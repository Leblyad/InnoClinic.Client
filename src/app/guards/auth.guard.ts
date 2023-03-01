import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  authService: AuthenticationService;
  router: Router;

  constructor(authService: AuthenticationService, router: Router) {
    this.authService = authService;
    this.router = router;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (localStorage.getItem('accessToken') != null) {
        var roles = route.data['Roles'] as Array<string>;
        if (roles) {
          if (roles.includes(this.authService.roles$.value)) {
            return true;
          } else {
            this.router.navigate(['/error/forbidden']);
            return false;
          }
        }
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      };
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('accessToken') != null) {
      var roles = route.data['Roles'] as Array<string>;
      if (roles) {
        if (roles.includes(this.authService.roles$.value)) {
          return true;
        } else {
          this.router.navigate(['/error/forbidden']);
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}