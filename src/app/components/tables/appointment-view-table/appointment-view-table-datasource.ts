import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IAppointment } from '../../../models/appointment';

export class AppointmentViewTableDataSource extends DataSource<IAppointment> {
  data: IAppointment[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    public appointment: IAppointment[]
  ) {
    super();
    this.data = appointment
  }

  connect(): Observable<IAppointment[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void { }

  private getPagedData(data: IAppointment[]): IAppointment[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: IAppointment[]): IAppointment[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'doctor':
          return compare(
            a.doctor.lastName + ' ' + a.doctor.firstName + ' ' + a.doctor.middleName,
            b.doctor.lastName + ' ' + b.doctor.firstName + ' ' + b.doctor.middleName, isAsc);
        case 'patient':
          return compare(
            a.patient.lastName + ' ' + a.patient.firstName + ' ' + a.patient.middleName,
            b.patient.lastName + ' ' + b.patient.firstName + ' ' + b.patient.middleName, isAsc);
        case 'serviceName': return compare(a.serviceName, b.serviceName, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}