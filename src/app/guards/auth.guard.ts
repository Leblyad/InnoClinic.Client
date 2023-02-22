import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authService: AuthenticationService;
  router: Router;

  constructor(authService: AuthenticationService, router: Router) {
    this.authService = authService;
    this.router = router;
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