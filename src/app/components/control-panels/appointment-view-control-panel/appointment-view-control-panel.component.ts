import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { delay, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AppointmentStatusEnum } from 'src/app/consts/routes';
import { IAppointment } from 'src/app/models/appointment';
import { IDoctor } from 'src/app/models/doctor';
import { IPatient } from 'src/app/models/patient';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { DataService } from 'src/app/services/data.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { CreateAppointmentModalComponent } from '../../modals/create-appointment-modal/create-appointment-modal.component';

@Component({
  selector: 'app-appointment-view-control-panel',
  templateUrl: './appointment-view-control-panel.component.html',
  styleUrls: ['./appointment-view-control-panel.component.css']
})
export class AppointmentViewControlPanelComponent implements OnInit {
  isFiltered: boolean = false;
  patients: IPatient[] = [];
  doctors: IDoctor[] = [];
  filteredAppointments: IAppointment[] = [];
  appointments: IAppointment[] = [];
  services: string[] = [];

  statuses = [
    { value: AppointmentStatusEnum.Approve, viewValue: AppointmentStatusEnum[AppointmentStatusEnum.Approve] },
    { value: AppointmentStatusEnum['Not approve'], viewValue: AppointmentStatusEnum[AppointmentStatusEnum['Not approve']] },
    { value: 'All', viewValue: 'All' }
  ];

  searchGroup: FormGroup = new FormGroup({
    patientControl: new FormControl(''),
    doctorControl: new FormControl(''),
    statusControl: new FormControl(''),
    serviceControl: new FormControl('')
  });

  filteredPatients: Observable<IPatient[]> | undefined;
  filteredDoctors: Observable<IDoctor[]> | undefined;

  ngUnsubscribe$ = new Subject();

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private matDialog: MatDialog,
    private appointmentService: AppointmentService
  ) {

  }

  sortData() {
    this.FilterData();

    this.appointmentService.appointments$.next(this.filteredAppointments);

    console.log(this.filteredAppointments);
  }

  ngOnInit() {
    this.appointmentService.appointments$.subscribe(res => {
      this.filteredAppointments = res
      if(!this.isFiltered)
      {
        this.getServices(this.filteredAppointments)
      }
    })

    this.getAllData();

    this.autocompleteData();
  }

  private FilterData() {
    if (!this.isFiltered) {
      this.appointments = this.filteredAppointments;
    }

    if (this.isFiltered) {
      this.filteredAppointments = this.appointments;
    }

    this.doData()
  }

  doData() {
    this.isFiltered = true;

    let patient = this.searchGroup.value.patientControl;
    let doctor = this.searchGroup.value.doctorControl;
    let status = this.searchGroup.value.statusControl;
    let service = this.searchGroup.value.serviceControl;

    console.log(patient)
    console.log(doctor)
    console.log(status)
    console.log(service);

    if (patient) {
      this.filteredAppointments = this.filteredAppointments.filter(r =>
        `${r.patient.lastName} ${r.patient.firstName} ${r.patient.middleName}`
          .toLowerCase().includes(patient.toLowerCase())
      )
    }

    if (doctor) {
      this.filteredAppointments = this.filteredAppointments.filter(r =>
        `${r.doctor.lastName} ${r.doctor.firstName} ${r.doctor.middleName}`
          .toLowerCase().includes(doctor.toLowerCase())
      )
    }

    if (status !== '') {
      if (status !== "All")
        this.filteredAppointments = this.filteredAppointments.filter(r =>
          r.status === status
        )
    }

    if (service) {
      this.filteredAppointments = this.filteredAppointments.filter(r =>
        r.serviceName
          .toLowerCase().includes(service.toLowerCase())
      )
    }
  }

  clear() {
    this.searchGroup.reset();

    this.appointmentService.getAll().subscribe(
      res => {
        this.appointmentService.appointments$.next(res);
      }
    )
  }

  getServices(apps: IAppointment[]) {
    this.services = [...new Set(apps.map(obj => obj.serviceName))];
    console.log(this.services);
  }

  private getAllData() {
    this.patientService.getAll().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.patients = res;
      });

    this.doctorService.getAll().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.doctors = res;
      });
  }

  private autocompleteData() {
    this.filteredPatients = this.searchGroup.controls['patientControl'].valueChanges.pipe(
      startWith(''),

      map(value => this._filterPatients(value as string || '')),
    );

    this.filteredDoctors = this.searchGroup.controls['doctorControl'].valueChanges.pipe(
      startWith(''),

      map(value => this._filterDoctors(value as string || '')),
    );
  }


  private _filterDoctors(value: string): IDoctor[] {
    const filterValue = value.toLowerCase();

    return this.doctors.filter(
      option => (option.lastName + " " + option.firstName + " " + option.middleName)
        .toLowerCase().includes(filterValue)
    );
  }

  private _filterPatients(value: string): IPatient[] {
    const filterValue = value.toLowerCase();

    return this.patients.filter(
      option => (option.lastName + " " + option.firstName + " " + option.middleName)
        .toLowerCase().includes(filterValue)
    );
  }

  openDialog() {
    const dialogRef = this.matDialog.open(CreateAppointmentModalComponent);
  }
}
