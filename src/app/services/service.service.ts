import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/consts/routes';
import { IService } from 'src/app/models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<IService[]> {
    return this.http.get<IService[]>(Routes.gatewayRoute + 'services')
  }
}
