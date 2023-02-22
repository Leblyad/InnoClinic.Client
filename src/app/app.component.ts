import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  signOut()
  {
    localStorage.clear();
    this.authService.isAuth$.next(false);
  }
}
