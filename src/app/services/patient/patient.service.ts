import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/consts/routes';
import { IPatient } from 'src/app/models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient
  ) { }
  
  getAll(): Observable<IPatient[]>
  {
    return this.http.get<IPatient[]>(Routes.profilesRoute + 'patients')
  }
}
