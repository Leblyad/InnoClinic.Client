import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { delay, Subject, takeUntil } from 'rxjs';
import { IAppointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { EditAppointmentModalComponent } from '../../modals/edit-appointment-modal/edit-appointment-modal';
import { AppointmentViewTableDataSource } from './appointment-view-table-datasource';

@Component({
  selector: 'app-appointment-view-table',
  templateUrl: './appointment-view-table.component.html',
  styleUrls: ['./appointment-view-table.component.scss']
})
export class AppointmentViewTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IAppointment>;
  dataSource: AppointmentViewTableDataSource = {} as AppointmentViewTableDataSource;
  _appointmentService: AppointmentService;
  ngUnsubscribe$ = new Subject();
  loading = false;

  displayedColumns = [ 'patient', 'doctor', 'serviceName', 'date', 'button'];

  constructor(
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

    this._appointmentService.getAll().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.dataSource = new AppointmentViewTableDataSource(res);
        this.ngAfterViewInit();
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    if (this.dataSource.data) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
  }
}