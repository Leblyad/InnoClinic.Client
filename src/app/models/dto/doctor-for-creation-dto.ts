export interface IDoctorForCreation {
    photo?: any
    photoName?: string
    
    photoId?: string
    accountId?: string

    firstName: string
    lastName: string
    middleName: string
    phoneNumber: string
    dateOfBirth: Date
    specializationId: string
    officeId: string
    careerStartYear: number
    status: number

    userName: string
    password: string,
    email: string
}