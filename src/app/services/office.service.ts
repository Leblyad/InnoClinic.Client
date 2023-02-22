import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes } from '../consts/routes';
import { IOffice } from '../models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IOffice[]> {
    return this.http.get<IOffice[]>(Routes.gatewayRoute + 'office')
  }
}
