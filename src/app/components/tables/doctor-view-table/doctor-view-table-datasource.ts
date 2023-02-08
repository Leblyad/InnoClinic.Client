import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IDoctor } from 'src/app/models/doctor';

export class DoctorViewTableDataSource extends DataSource<IDoctor> {
  data: IDoctor[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    private doctor: IDoctor[]
  ) {
    super();
    this.data = doctor
  }

  connect(): Observable<IDoctor[]> {
    if (this.paginator && this.sort) {
      this.data.forEach(doctor => {
        doctor.expirience = getExpirienceYears(doctor.careerStartYear)
      });
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void { }

  private getPagedData(data: IDoctor[]): IDoctor[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: IDoctor[]): IDoctor[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function getExpirienceYears(date: number): number {
  let dateNow = new Date().getFullYear()
  return dateNow - date
}