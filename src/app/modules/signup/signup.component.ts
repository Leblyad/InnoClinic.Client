import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IPatientForCreation } from 'src/app/models/dto/patient-for-creation-dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
  ]
})
export class SignupComponent implements OnInit {
  helper = new JwtHelperService();
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  srcResult: any;
  signupForm: FormGroup;
  accountForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { 
    this.signupForm = new FormGroup({
      email: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      ),
      confirmPassword: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      )
    });

    this.accountForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      dateControl: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      photo: new FormControl('')
    });
  }

  ngOnInit() {

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      this.accountForm.get('photo')?.setValue(inputNode.files[0].name);
    }
  }

  clearFileSelected() {
    this.srcResult = null;
    this.accountForm.get('photo')?.setValue('');
    let inputNode: any = document.querySelector('#file');
    inputNode.value = null;
  }

  createAccount()
  {
    let patient = {} as IPatientForCreation;

    patient.email = this.signupForm.value.email;
    patient.password = this.signupForm.value.password;
    patient.userName = this.signupForm.value.confirmPassword;

    patient.firstName = this.accountForm.value.firstName;
    patient.lastName = this.accountForm.value.lastName;
    patient.middleName = this.accountForm.value.middleName;
    patient.photo = btoa(new Uint8Array(this.srcResult).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    patient.phoneNumber = this.accountForm.value.phone;
    console.log(this.accountForm.value.phone)
    console.log(patient.phoneNumber)
    patient.dateOfBirth = this.accountForm.value.dateControl;

    this.authService.CreatePatient(patient);
  }
}
