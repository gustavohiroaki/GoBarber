import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentsDTO";
import IFindAllInMonthProviderDTO from "@modules/appointments/dtos/IFindAllInMonthProviderDTO";
import IFindAllInDayProviderDTO from "@modules/appointments/dtos/IFindAllInDayProviderDTO";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayProviderDTO
  ): Promise<Appointment[]>;
}
