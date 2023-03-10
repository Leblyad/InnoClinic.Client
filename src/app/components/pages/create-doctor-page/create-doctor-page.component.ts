import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, startWith } from 'rxjs';
import { DoctorStatus } from 'src/app/consts/routes';
import { IDoctorForCreation } from 'src/app/models/dto/doctor-for-creation-dto';
import { IOffice } from 'src/app/models/office';
import { ISpecialization } from 'src/app/models/specialization';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OfficeService } from 'src/app/services/office.service';
import { SpecializationService } from 'src/app/services/specialization.service';

@Component({
  selector: 'app-create-doctor-page',
  templateUrl: './create-doctor-page.component.html',
  styleUrls: ['./create-doctor-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class CreateDoctorPageComponent implements OnInit {
  minDate = new Date(new Date().getFullYear() - 40, 0, 1);
  maxDate = new Date();
  helper = new JwtHelperService();
  offices: IOffice[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  srcResult: any;
  signupForm: FormGroup;
  specializations: ISpecialization[] = [];
  filteredSpecializations: Observable<ISpecialization[]> | undefined;

  statuses = [
    { value: DoctorStatus['At work'],
      viewValue: DoctorStatus[DoctorStatus['At work']]},
      { value: DoctorStatus.Inactive,
      viewValue: DoctorStatus[DoctorStatus.Inactive]},
      { value: DoctorStatus['Leave without pay'],
      viewValue: DoctorStatus[DoctorStatus['Leave without pay']]},
      { value: DoctorStatus['On vacation'],
      viewValue: DoctorStatus[DoctorStatus['On vacation']]},
      { value: DoctorStatus['Self isolation'],
      viewValue: DoctorStatus[DoctorStatus['Self isolation']]},
      { value: DoctorStatus['Sick day'],
      viewValue: DoctorStatus[DoctorStatus['Sick day']]},
      { value: DoctorStatus['Sick leave'],
      viewValue: DoctorStatus[DoctorStatus['Sick leave']]},
  ];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    officeService: OfficeService,
    specializationService: SpecializationService,
    ) { 
    this.signupForm = new FormGroup({
      email: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      ),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      dateControl: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      startYear: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
      office: new FormControl('', Validators.required)
    });

    officeService.getAll().subscribe(res => {
      this.offices = res;
      this.setFullOfficeAddresses();
    })

    specializationService.getAll().subscribe(res => {
      this.specializations = res;
    })
  }

  ngOnInit() {
    this.filteredSpecializations = this.signupForm.controls['specialization'].valueChanges.pipe(
      startWith(''),

      map(value => this._filterSpecializations(value as string || '')),
    );
  }

  private _filterSpecializations(value: string): ISpecialization[] {
    const filterValue = value;

    return this.specializations.filter(
      option => (option.name)
        .toLowerCase().includes(filterValue)
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  chooseYear(year: any, datepicker: any) {
    const tempDate = Number(JSON.stringify(year).replace('"', '').split('-')[0]) + 1;
    console.log(tempDate)
    this.signupForm.get('startYear')?.setValue(tempDate.toString());
    datepicker.close();
  }

  private setFullOfficeAddresses() {
    this.offices.forEach(o =>
      o.fullAddress = o.city + ', ' + o.street + ', ' + o.houseNumber);
  }

  displaySpec(spec: ISpecialization): string {
    return spec && spec.name ? spec.name : '';
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      this.signupForm.get('photo')?.setValue(inputNode.files[0].name);
    }
  }

  clearFileSelected() {
    this.srcResult = null;
    this.signupForm.get('photo')?.setValue('');
    let inputNode: any = document.querySelector('#file');
    inputNode.value = null;
  }

  createAccount()
  {
    let doctor = {} as IDoctorForCreation;

    doctor.email = this.signupForm.value.email;
    doctor.password = this.signupForm.value.password;
    doctor.userName = this.signupForm.value.confirmPassword;

    doctor.firstName = this.signupForm.value.firstName;
    doctor.lastName = this.signupForm.value.lastName;
    doctor.middleName = this.signupForm.value.middleName;
    doctor.photo = btoa(new Uint8Array(this.srcResult).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    doctor.phoneNumber = this.signupForm.value.phone;
    doctor.careerStartYear = this.signupForm.value.startYear;
    doctor.specializationId = (this.signupForm.value.specialization as ISpecialization).id;
    doctor.status = this.signupForm.value.status;
    doctor.officeId = (this.signupForm.value.office as IOffice).id;
    doctor.dateOfBirth = this.signupForm.value.dateControl;

    this.authService.CreateDoctor(doctor);
  }
}
