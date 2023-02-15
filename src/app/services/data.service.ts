import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAppointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new Subject<IAppointment[]>();
  data$ = this.dataSubject.asObservable();

  constructor() { }

  updateData(data: any) {
    this.dataSubject.next(data);
  }
}
