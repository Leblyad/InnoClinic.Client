export class Routes {
    static gatewayRoute = 'https://localhost:7243/gateway/'
} 

export const date = new Date().getFullYear

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};

export enum AppointmentStatusEnum
{
    "Approve" = 0,
    "Not approve" = 1
}

export enum Roles {
    Patient = 'Patient',
    Receptionist = 'Receptionist',
    Doctor = 'Doctor'
  }
