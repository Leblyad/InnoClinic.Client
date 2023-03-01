import { IOffice } from "./office"
import { IPhoto } from "./photo"
import { ISpecialization } from "./specialization"

export interface IDoctor {
    id: string
    photoId: string
    firstName: string
    lastName: string
    middleName: string
    dateOfBirth: string
    email: string
    specializationId: string
    officeId: string
    careerStartYear: number
    status: number
    expirience: number
    photo: IPhoto
    office: IOffice
    specialization: ISpecialization
}