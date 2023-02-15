import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { IAppointment } from 'src/app/models/appointment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Routes } from 'src/app/consts/routes';
import { IAppointmentForUpdate } from 'src/app/models/dto/appointment-for-update-dto';
import { IAppointmentForCreate } from 'src/app/models/dto/appointment-for-create-dto';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

constructor(
  private http: HttpClient
  ) { }

  appointments$ = new BehaviorSubject<IAppointment[]>([]);

  getAll(): Observable<IAppointment[]>
  {
    return this.http.get<IAppointment[]>(Routes.appointmentRoute + 'appointments/view');
  }

  update(id:string, appointment: IAppointmentForUpdate): Observable<IAppointment>
  {
    return this.http.put<IAppointment>(Routes.appointmentRoute + "appointments/" + id, appointment);
  }

  create(appointment: IAppointmentForCreate): Observable<IAppointment>
  {
    return this.http.post<IAppointment>(Routes.appointmentRoute + "appointments", appointment);
  }

  mapToAppaointmentForUpdate(appointment: IAppointment): IAppointmentForUpdate {
    let appForUpdate = {} as IAppointmentForUpdate;

    appForUpdate.doctorId = appointment.doctor.id;
    appForUpdate.officeId = appointment.officeId;
    appForUpdate.patientId = appointment.patient.id;
    appForUpdate.serviceId = appointment.serviceId;
    appForUpdate.serviceName = appointment.serviceName;
    appForUpdate.status = appointment.status;
    appForUpdate.date = appointment.date;
    appForUpdate.timeslots = appointment.timeslots;

    return appForUpdate;
  }
}
