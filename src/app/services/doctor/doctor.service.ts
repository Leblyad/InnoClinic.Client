import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/consts/routes';
import { IDoctor } from 'src/app/models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

constructor(
  private http: HttpClient
) { }

getAll(): Observable<IDoctor[]>
{
  return this.http.get<IDoctor[]>(Routes.profilesRoute + 'doctors')
}

}
