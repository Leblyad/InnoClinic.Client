import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { delay, Subject, takeUntil } from 'rxjs';
import { AppointmentStatusEnum } from 'src/app/consts/routes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IAppointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment.service';
import { EditAppointmentModalComponent } from '../../modals/edit-appointment-modal/edit-appointment-modal';
import { AppointmentByDoctorViewTableDataSource } from './appointment-view-by-doctor-datasource';

@Component({
  selector: 'app-appointment-view-by-doctor',
  templateUrl: './appointment-view-by-doctor.component.html',
  styleUrls: ['./appointment-view-by-doctor.component.scss']
})
export class AppointmentViewByDoctorComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IAppointment>;
  dataSource: AppointmentByDoctorViewTableDataSource = {} as AppointmentByDoctorViewTableDataSource;
  _appointmentService: AppointmentService;
  ngUnsubscribe$ = new Subject();
  loading = false;

  displayedColumns = ['time','date', 'patient', 'phone', 'serviceName', 'status'];

  constructor(
    private authService: AuthenticationService,
    private appointmentService: AppointmentService,
    private matDialog: MatDialog
  ) {
    this._appointmentService = appointmentService;
  }

  openDialog(appointment: IAppointment) {
    const dialogRef = this.matDialog.open(EditAppointmentModalComponent, {
      data: appointment
    });
  }

  ngOnInit(): void {
    this.loading = true;

    this.authService.getDoctor().subscribe(
      doc => {
        this._appointmentService.getAppointmentsByDoctor(doc.id).pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(res => {
          console.log(res)
          this.appointmentService.appointments$.next(res);
          this.dataSource = new AppointmentByDoctorViewTableDataSource(this.appointmentService.appointments$.value);
          this.ngAfterViewInit();
          this.loading = false;
        });
      }
    )

  }

  ngAfterViewInit(): void {
    if (this.dataSource.data) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this._appointmentService.appointments$.subscribe(res => {
        this.dataSource.appointment = this.dataSource.data = res;
        this.table.dataSource = new AppointmentByDoctorViewTableDataSource(res);
        this.table.dataSource = this.dataSource;
      })
    }
  }

  approve(appointment: IAppointment) {
    appointment.status = AppointmentStatusEnum.Approve;
    appointment.statusString = AppointmentStatusEnum[AppointmentStatusEnum.Approve];
    let appForUpdate = this._appointmentService.mapToAppaointmentForUpdate(appointment);
    this._appointmentService.update(appointment.id, appForUpdate).subscribe();
  }

  cancel(appointment: IAppointment) {
    appointment.status = AppointmentStatusEnum['Not approve'];
    appointment.statusString = AppointmentStatusEnum[AppointmentStatusEnum['Not approve']];
    let appForUpdate = this._appointmentService.mapToAppaointmentForUpdate(appointment);
    this._appointmentService.update(appointment.id, appForUpdate).subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
  }

  length() : number{
    return this.dataSource?.data?.length;
  }
}