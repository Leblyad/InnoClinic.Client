import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { IService } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service/service.service';
import { ServiceViewTableDataSource } from './service-view-table-datasource';

@Component({
  selector: 'app-service-view-table',
  templateUrl: './service-view-table.component.html',
  styleUrls: ['./service-view-table.component.scss']
})
export class ServiceViewTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IService>;
  dataSource: ServiceViewTableDataSource = {} as ServiceViewTableDataSource;
  _serviceService: ServiceService;
  ngUnsubscribe$ = new Subject();
  loading = false;

  displayedColumns = ['id', 'name'];

  constructor(
    private serviceService: ServiceService
  ) {
    this._serviceService = serviceService;
  }

  ngOnInit(): void {
    this.loading = true;

    this._serviceService.getAll().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        this.dataSource = new ServiceViewTableDataSource(res);
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
