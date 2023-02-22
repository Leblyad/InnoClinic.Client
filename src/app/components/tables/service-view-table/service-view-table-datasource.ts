import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';
import { IService } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

export class ServiceViewTableDataSource extends DataSource<IService> {
  data: IService[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  ngUnsubscribe$ = new Subject();


  constructor(
    private service: IService[]
  ) {
    super();
    this.data = service;
  }

  connect(): Observable<IService[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {
    this.ngUnsubscribe$.next(null);
  }

  private getPagedData(data: IService[]): IService[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: IService[]): IService[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
