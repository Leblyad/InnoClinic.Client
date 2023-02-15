import { Injectable } from "@angular/core"
import { IDoctor } from "./doctor"
import { IPatient } from "./patient"

export interface IAppointment {
    id: string,
    patientId: string,
    doctorId: string,
    serviceId: string,
    officeId: string,
    date: Date,
    timeslots: string,
    status: number,
    statusString: string,
    serviceName: string,
    doctor: IDoctor,
    patient: IPatient
}