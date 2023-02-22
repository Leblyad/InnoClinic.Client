import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('accessToken') != null) {
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          () => {},
          err => {
            if (err.status == 401) {
              localStorage.removeItem('accessToken');
              this.router.navigateByUrl('/login');
            } else if (err.status == 403) {
              this.router.navigateByUrl('/error/forbidden');
            }
          }
        )
      );
    } else return next.handle(request.clone());
  }
}