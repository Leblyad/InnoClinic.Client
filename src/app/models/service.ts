import { IServiceCategory } from "./service-category";
import { ISpecialization } from "./specialization";

export interface IService {
      id: string,
      name: string,
      price: number,
      specialization: ISpecialization,
      serviceCategory: IServiceCategory
}