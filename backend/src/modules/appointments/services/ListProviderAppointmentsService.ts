import { inject, injectable } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

// import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    return appointments;
  }
}
