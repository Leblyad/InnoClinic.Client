import { Time } from "@angular/common"
import { IDoctor } from "./doctor"
import { IPatient } from "./patient"

export interface IAppointment {
    id: string,
    patientId: string,
    doctorId: string,
    serviceId: string,
    officeId: string,
    date: Date,
    time: Time,
    status: number,
    statusString: string,
    serviceName: string,
    duration: number,
    doctor: IDoctor,
    patient: IPatient
}