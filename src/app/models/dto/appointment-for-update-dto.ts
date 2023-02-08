export interface IAppointmentForUpdate {
    patientId: string,
    doctorId: string,
    serviceId: string,
    officeId: string,
    date: Date,
    timeslots: string,
    status: number,
    serviceName: string
}