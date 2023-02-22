import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Routes, Roles } from '../consts/routes';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper = new JwtHelperService();
  isAuth$ = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  roles$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {
    this.updateRoles();
  }

  updateRoles() {
    if (localStorage.getItem('accessToken') != null)
      this.roles$ = new BehaviorSubject<string>(this.helper.decodeToken(localStorage.getItem('accessToken') || '').roles);
  }

  SignIn(data: any) {
    let form = {
      Email: data['email'],
      Password: data['password']
    };
    return this.httpClient.post(Routes.gatewayRoute + 'authentication/login', form);
  }

  SignUp(data: any) {
    let form = {
      Email: data['email'],
      Password: data['password'],
      ConfirmPassword: data['confirmPassword']
    };
    return this.httpClient.post(Routes.gatewayRoute + '/Auth/SignUp', form);
  }

  SignOut() {
    return this.httpClient.get(Routes.gatewayRoute + '/Auth/SingOut');
  }

  ChangeRole(userId: string, role: any) {
    return this.httpClient.post(Routes.gatewayRoute + '/Auth/ChangeRole/' + userId, role);
  }

  isEmailExists(email: string) {
    return this.httpClient.get(Routes.gatewayRoute + '/Auth/IsEmailExists?email=' + email);
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
