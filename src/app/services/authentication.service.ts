import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Routes, Roles } from '../consts/routes';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPatient } from '../models/patient';
import { IPatientForCreation } from '../models/dto/patient-for-creation-dto';
import { IPhoto } from '../models/photo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper = new JwtHelperService();
  isAuth$ = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  roles$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  id$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient,
    private router: Router
  ) {
    this.updateRoleAndId();
  }

  updateRoleAndId() {
    if (localStorage.getItem('accessToken') != null) {
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

  CreatePatient(patient: IPatientForCreation) {
    let user =
    {
      Email: patient.email,
      UserName: patient.email,
      Password: patient.password,
      FirstName: patient.firstName,
      LastName: patient.lastName,
      phoneNumber: patient.phoneNumber
    };

    this.httpClient.post(Routes.authRoute + 'authentication', user).subscribe(
      () => this.SignIn(patient).subscribe(
        (res: any) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.isAuth$.next(true);
          this.updateRoleAndId();
          patient.accountId = this.id$.value;
          let photo =
          {
            FileName: patient.photoName,
            Value: patient.photo
          }
          this.httpClient.post<IPhoto>(Routes.gatewayRoute + 'photo', photo).subscribe(
            res => {
              patient.photoId = res.id
              let patientProfile =
              {
                PhotoId: patient.photoId,
                FirstName: patient.firstName,
                LastName: patient.lastName,
                MiddleName: patient.middleName,
                PhoneNumber: patient.phoneNumber,
                DateOfBirth: patient.dateOfBirth,
                AccountId: patient.accountId
              }

              console.log(patient);

              this.httpClient.post(Routes.gatewayRoute + 'patients', patientProfile).subscribe
                (
                  () => this.router.navigate(['/patient/view'])
                )
            })
        }));
  }

  getPatient(): Observable<IPatient> {
    return this.httpClient.get<IPatient>(Routes.gatewayRoute + 'patients/account/' + this.id$.value)
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
