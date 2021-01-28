import { getRepository, Repository, Raw } from "typeorm";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentsDTO";
import IFindAllInMonthProviderDTO from "@modules/appointments/dtos/IFindAllInMonthProviderDTO";
import IFindAllInDayProviderDTO from "@modules/appointments/dtos/IFindAllInDayProviderDTO";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    year,
    provider_id,
  }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");
    const parsedDay = String(day).padStart(2, "0");

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointments = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointments);

    return appointments;
  }
}

export default AppointmentsRepository;
