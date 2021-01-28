import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear, getDate } from "date-fns";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentsDTO";
import IFindAllInMonthProviderDTO from "@modules/appointments/dtos/IFindAllInMonthProviderDTO";
import IFindAllInDayProviderDTO from "@modules/appointments/dtos/IFindAllInDayProviderDTO";

import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    year,
    provider_id,
  }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
    const filterAppointment = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return filterAppointment;
  }

  public async findAllInDayFromProvider({
    month,
    year,
    provider_id,
    day,
  }: IFindAllInDayProviderDTO): Promise<Appointment[]> {
    const filterAppointment = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day
    );

    return filterAppointment;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
