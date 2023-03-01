import { Time } from "@angular/common";

export interface IAppointmentForUpdate {
    patientId: string,
    doctorId: string,
    serviceId: string,
    officeId: string,
    date: Date,
    time: Time,
    status: number,
    serviceName: string,
    duration: number
}