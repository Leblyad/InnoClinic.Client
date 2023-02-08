import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAppointment } from 'src/app/models/appointment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Subject, takeUntil } from 'rxjs';
import { IAppointmentForUpdate } from 'src/app/models/dto/appointment-for-update-dto';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-edit-appointment-modal',
  templateUrl: './edit-appointment-modal.html',
  styleUrls: ['./edit-appointment-modal.css'],
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
        },
      }
    }
  ]
})
export class EditAppointmentModalComponent implements OnInit, OnDestroy {
  _appointmentService: AppointmentService;
  ngUnsubscribe$ = new Subject();
  appForCreation: IAppointmentForUpdate = {} as any;
  date: Date = {} as Date;
  timeslots: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAppointment,
    private appoitnmentService: AppointmentService
  ) {
    this._appointmentService = appoitnmentService;
  }

  updateAppointment() {
    this.mapToAppaointmentForCreation(this.data);
    if (this.data && this.timeslots) {
      this._appointmentService.update(this.data.id, this.appForCreation).pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
  }

  mapToAppaointmentForCreation(appointment: IAppointment): void {
    let dateForUpdate = new Date();
    if (this.data && this.timeslots) {
      dateForUpdate = new Date(this.date);
      appointment.date = this.date;
      appointment.timeslots = this.timeslots;
    }

    this.appForCreation.doctorId = appointment.doctor.id;
    this.appForCreation.officeId = appointment.officeId;
    this.appForCreation.patientId = appointment.patient.id;
    this.appForCreation.serviceId = appointment.serviceId;
    this.appForCreation.serviceName = appointment.serviceName;
    this.appForCreation.status = appointment.status;
    this.appForCreation.date = addOneDay(dateForUpdate);
    this.appForCreation.timeslots = appointment.timeslots;
  }
}

function addOneDay(date = new Date()) {
  date.setDate(date.getDate() + 1);

  return date;
}