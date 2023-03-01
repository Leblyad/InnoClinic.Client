import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IService } from 'src/app/models/service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServiceService } from 'src/app/services/service.service';
import { CreateAppointmentByPatientComponent } from '../../modals/create-appointment-by-patient/create-appointment-by-patient.component';
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

  @Input() categoty: string = '';

  dataSource: ServiceViewTableDataSource = {} as ServiceViewTableDataSource;
  _serviceService: ServiceService;
  ngUnsubscribe$ = new Subject();
  loading = false;

  displayedColumns = [ 'name', 'price', 'button'];

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private serviceService: ServiceService,
    private authService: AuthenticationService
  ) {
    this._serviceService = serviceService;
  }

  ngOnInit(): void {
    this.loading = true;

    this._serviceService.getAll().pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(res => {
        let data = this.filterSource(res, this.categoty);
        this.dataSource = new ServiceViewTableDataSource(data);
        this.ngAfterViewInit();
        this.loading = false;
      });
  }

  private filterSource(services: IService[], category: string): IService[] {
    return services.filter(serv => serv.serviceCategory.categoryName.includes(category));
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

  length(): number {
    return this.dataSource?.data?.length
  }

  openCreateAppDialog(service: IService) {
    if (!this.authService.isAuth$.value) {
      this.router.navigate(['/login']);
    }
    else {
      this.authService.getPatient().subscribe(
        res => {
          const dialog = this.matDialog.open(CreateAppointmentByPatientComponent,
            {
            data: {
              patient: res,
              service: service
            }
            }
          );
        }
      )
    }
  }
}
