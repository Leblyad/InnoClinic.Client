import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/consts/routes';
import { IService } from 'src/app/models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  pipe(arg0: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<IService[]> {
    var temp = this.http.get<IService[]>(Routes.serviceRoute + 'services')

    return temp;
  }
}
