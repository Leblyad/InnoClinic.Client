import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Roles } from 'src/app/consts/routes';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  helper = new JwtHelperService();
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  router: Router;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    password: new FormControl('',
      Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    )
  });
  authService: AuthenticationService;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(authService: AuthenticationService,
   router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit() {
  }

  submit() {
    this.authService.SignIn(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.authService.updateRoleAndId();
        this.authService.isAuth$.next(true);
        if(this.authService.isReceptionist())
        {
          this.router.navigate(['/receptionist/view'])
        }
        else if(this.authService.isDoctor())
        {
          this.router.navigate(['/doctor/view'])
        }
        else
        {
          this.router.navigate(['/patient/view'])
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
