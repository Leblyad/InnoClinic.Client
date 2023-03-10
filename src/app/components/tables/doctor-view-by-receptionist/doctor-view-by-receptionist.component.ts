import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IDoctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { DoctorViewByReceptionistDataSource } from './doctor-view-by-receptionist-datasource';

@Component({
  selector: 'app-doctor-view-by-receptionist',
  templateUrl: './doctor-view-by-receptionist.component.html',
  styleUrls: ['./doctor-view-by-receptionist.component.scss']
})
export class DoctorViewByReceptionistComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IDoctor>;
  dataSource: DoctorViewByReceptionistDataSource = {} as DoctorViewByReceptionistDataSource;
  ngUnsubscribe$ = new Subject();
  _doctorService: DoctorService;
  loading = false;

  displayedColumns = ['photo', 'fullName', 'specialization', 'date', 'office_address'];

  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) {
    this._doctorService = doctorService;
  }

  ngOnInit(): void {
    this.loading = true;

    this._doctorService.getView().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.dataSource = new DoctorViewByReceptionistDataSource(res);
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

  length() : number
  {
    return this.dataSource?.data?.length;
  }

  navigate()
  {
    this.router.navigate(['/receptionist/create-doctor']);
  }
}
