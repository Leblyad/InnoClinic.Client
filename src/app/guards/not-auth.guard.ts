import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
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
        if (localStorage.getItem('accessToken') == null) {
            return true;
        } else {
            return false;
        }
    }
}