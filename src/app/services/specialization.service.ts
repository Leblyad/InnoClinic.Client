import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes } from '../consts/routes';
import { ISpecialization } from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

constructor(private http: HttpClient) { }

getAll(): Observable<ISpecialization[]> {
  return this.http.get<ISpecialization[]>(Routes.gatewayRoute + 'specializations')
}
}
