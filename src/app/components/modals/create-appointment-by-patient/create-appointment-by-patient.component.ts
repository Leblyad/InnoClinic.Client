import { Time } from '@angular/common';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { DateWithTimeSlots, TimeWithStatus } from 'src/app/models/DateWithTimeSlots';
import { IDoctor } from 'src/app/models/doctor';
import { IAppointmentForCreate } from 'src/app/models/dto/appointment-for-create-dto';
import { IOffice } from 'src/app/models/office';
import { IPatient } from 'src/app/models/patient';
import { IService } from 'src/app/models/service';
import { ISpecialization } from 'src/app/models/specialization';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { OfficeService } from 'src/app/services/office.service';
import { PatientService } from 'src/app/services/patient.service';
import { ServiceService } from 'src/app/services/service.service';
import { SpecializationService } from 'src/app/services/specialization.service';
import { TimePickerComponent } from 'src/app/shared/time-picker/time-picker.component';

@Component({
  selector: 'app-create-appointment-by-patient',
  templateUrl: './create-appointment-by-patient.component.html',
  styleUrls: ['./create-appointment-by-patient.component.css'],
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
export class CreateAppointmentByPatientComponent implements OnInit {
  appForCreation: IAppointmentForCreate = {} as IAppointmentForCreate;

  createGroup: FormGroup = new FormGroup({
    doctorControl: new FormControl(''),
    specializationControl: new FormControl(''),
    serviceControl: new FormControl(''),
    officeControl: new FormControl(''),
    dateControl: new FormControl(''),
    timeSlots: new FormControl('')
  });

  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  dateWithTimeSlots: Array<DateWithTimeSlots> = [];
  choosenTimeSlots: Array<TimeWithStatus> | undefined = [];
  placeholderService = 'Select service';

  isTimeDisabled = true;
  isDoctorDisabled = true;
  isDateDisabled = true;
  serviceDisable = false;

  doctors: IDoctor[] = [];
  services: IService[] = [];
  specializations: ISpecialization[] = [];
  offices: IOffice[] = [];

  filteredPatients: Observable<IPatient[]> | undefined;
  filteredDoctors: Observable<IDoctor[]> | undefined;
  filteredSpecializations: Observable<ISpecialization[]> | undefined;
  filteredServices: Observable<IService[]> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      patient: IPatient,
      service: IService
    },
    private matDialog: MatDialog,
    private appoitnmentService: AppointmentService,
    doctorService: DoctorService,
    specializationService: SpecializationService,
    serviceService: ServiceService,
    officeService: OfficeService
  ) {
    doctorService.getAll().subscribe(res => {
      this.doctors = res;
    });

    specializationService.getAll().subscribe(res => {
      this.specializations = res;
    })

    serviceService.getAll().subscribe(res => {
      this.services = res;
    })

    officeService.getAll().subscribe(res => {
      this.offices = res;
      this.setFullOfficeAddresses();
    })
  }

  ngOnInit() {
    this.autocompleteData();
    if(this.data.service)
    {
      this.createGroup.value.serviceControl = this.data.service;
      this.placeholderService = this.data.service.name;
      this.serviceDisable = true;
    }
  }

  create() {
    let app = this.madeAppointmentForCreate();
    this.appoitnmentService.create(app).subscribe();
  }

  private autocompleteData() {
    this.filteredDoctors?.subscribe(res => {
      if (res) {

      }
    })

    this.filteredDoctors = this.createGroup.controls['doctorControl'].valueChanges.pipe(
      startWith(''),

      map(value =>
        this._filterDoctors(value as string || ''),
      ),
    );

    this.filteredSpecializations = this.createGroup.controls['specializationControl'].valueChanges.pipe(
      startWith(''),

      map(value => this._filterSpecializations(value as string || '')),
    );
    
    this.filteredServices = this.createGroup.controls['serviceControl'].valueChanges.pipe(
      startWith(''),

      map(value => this._filterServices(value as string || '')),
    );
  }

  private _filterDoctors(value: string): IDoctor[] {
    const filterValue = value;

    return this.doctors.filter(
      option => (option.lastName + " " + option.firstName + " " + option.middleName)
        .toLowerCase().includes(filterValue)
    );
  }

  private _filterSpecializations(value: string): ISpecialization[] {
    const filterValue = value;

    return this.specializations.filter(
      option => (option.name)
        .toLowerCase().includes(filterValue)
    );
  }

  private _filterServices(value: string): IService[] {
    const filterValue = value;

    return this.services.filter(
      option => (option.name)
        .toLowerCase().includes(filterValue)
    );
  }

  private setFullOfficeAddresses() {
    this.offices.forEach(o =>
      o.fullAddress = o.city + ', ' + o.street + ', ' + o.houseNumber);
  }

  madeAppointmentForCreate(): IAppointmentForCreate {
    let app = {} as IAppointmentForCreate;

    let patient = this.data.patient as IPatient;
    let doctor = this.createGroup.value.doctorControl as IDoctor;
    let service = this.createGroup.value.serviceControl as IService;
    let office = this.createGroup.value.officeControl as IOffice;
    let date = this.createGroup.value.dateControl as Date;
    let dateToUpdate = new Date(date);
    let time = this.createGroup.value.timeSlots as Time;

    let timeSlotSize = 0;
    if(this.data.service)
    {
      timeSlotSize = this.data.service.serviceCategory.timeSlotSize;
    }
    else
    {
      timeSlotSize = service.serviceCategory.timeSlotSize;
    }

    app.doctorId = doctor.id;
    app.officeId = office.id;
    app.serviceId = service.id;
    app.patientId = patient.id;
    app.status = 1;
    app.duration = timeSlotSize;
    app.date = addOneDay(dateToUpdate);
    app.serviceName = service.name;
    app.time = time;

    console.log(app);

    return app;
  }

  displayPatient(patient: IPatient): string {
    let fullName = patient.lastName + " " + patient.firstName + " " + patient.middleName;
    return patient && fullName ? fullName : '';
  }

  displayDoctor(doctor: IDoctor): string {
    let fullName = doctor.lastName + " " + doctor.firstName + " " + doctor.middleName;
    return doctor && fullName ? fullName : '';
  }

  displaySpec(spec: ISpecialization): string {
    return spec && spec.name ? spec.name : '';
  }

  displayService(service: IService): string {
    return service && service.name ? service.name : '';
  }

  displayOffice(office: IOffice): string {
    return office && office.fullAddress ? office.fullAddress : '';
  }

  openTimeSlotDialog() {
    let doctor = this.createGroup.value.doctorControl as IDoctor;
    let date = new Date(this.createGroup.value.dateControl as Date);
    let service = this.createGroup.value.serviceControl as IService;

    let timeSlotSize = 0;
    if(this.data.service)
    {
      timeSlotSize = this.data.service.serviceCategory.timeSlotSize;
    }
    else
    {
      timeSlotSize = service.serviceCategory.timeSlotSize;
    }

    this.appoitnmentService.getTimeSlots(doctor.id).subscribe
      (
        (res: Array<DateWithTimeSlots>) => {
          this.dateWithTimeSlots = res;
          this.choosenTimeSlots = this.dateWithTimeSlots.filter(
            d => new Date(d.date).getDate() == date.getDate())[0].timeWithStatuses
          const dialog = this.matDialog.open(TimePickerComponent, {
            height: '350px',
            width: '600px',
            data: [this.choosenTimeSlots, timeSlotSize]
          });

          dialog.afterClosed().subscribe(result => {
            this.isTimeDisabled = false;
            this.createGroup.controls['timeSlots'].setValue(result);
          });
        },
      )
  }
}

function addOneDay(date = new Date()) {
  date.setDate(date.getDate() + 1);

  return date;
}
