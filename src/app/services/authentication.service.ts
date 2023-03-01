import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Routes, Roles } from '../consts/routes';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPatient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper = new JwtHelperService();
  isAuth$ = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  roles$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  id$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {
    this.updateRoleAndId();
  }

  updateRoleAndId() {
    if (localStorage.getItem('accessToken') != null)
    {
      this.roles$ = new BehaviorSubject<string>(this.helper.decodeToken(localStorage.getItem('accessToken') || '').roles);
      this.id$ = new BehaviorSubject<string>(this.helper.decodeToken(localStorage.getItem('accessToken') || '').sub);
      console.log(this.id$.value)
    }
  }

  SignIn(data: any) {
    let form = {
      Email: data['email'],
      Password: data['password']
    };
    return this.httpClient.post(Routes.authRoute + 'authentication/login', form);
  }

  getPatient() : Observable<IPatient>
  {
    return this.httpClient.get<IPatient>(Routes.gatewayRoute + 'patients/account/' + this.id$.value)
  }

  SignUp(data: any) {
    let form = {
      Email: data['email'],
      Password: data['password'],
      ConfirmPassword: data['confirmPassword']
    };
    return this.httpClient.post(Routes.authRoute + 'authentication', form);
  }

  SignOut() {
    return this.httpClient.get(Routes.authRoute + 'authentication/signout');
  }

  ChangeRole(userId: string, role: any) {
    return this.httpClient.post(Routes.authRoute + 'authentication/role' + userId, role);
  }

  isReceptionist() {
    return this.roles$.value == Roles.Receptionist;
  }

  isPatient() {
    return this.roles$.value == Roles.Patient;
  }

  isDoctor() {
    return this.roles$.value == Roles.Doctor;
  }
}
