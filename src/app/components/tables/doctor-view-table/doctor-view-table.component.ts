import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { delay, Subject, takeUntil } from 'rxjs';
import { IDoctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { IAppointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { DoctorViewTableDataSource } from './doctor-view-table-datasource';

@Component({
  selector: 'app-doctor-view-table',
  templateUrl: './doctor-view-table.component.html',
  styleUrls: ['./doctor-view-table.component.scss']
})
export class DoctorViewTableComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IDoctor>;
  dataSource: DoctorViewTableDataSource = {} as DoctorViewTableDataSource;
  ngUnsubscribe$ = new Subject();
  _doctorService: DoctorService;
  loading = false;

  displayedColumns = ['fullName', 'date'];

  constructor(
    private doctorService: DoctorService
  ) {
    this._doctorService = doctorService;
  }

  ngOnInit(): void {
    this.loading = true;

    this._doctorService.getAll().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.dataSource = new DoctorViewTableDataSource(res);
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
