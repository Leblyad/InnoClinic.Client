export class Routes {
    static appointmentRoute = 'https://localhost:7118/api/'
    static profilesRoute = 'https://localhost:7203/api/'
    static officeRoute = 'https://localhost:7038/api/'
    static serviceRoute = 'https://localhost:7209/api/'
    static documentsRoute = 'https://localhost:7003/api/'
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