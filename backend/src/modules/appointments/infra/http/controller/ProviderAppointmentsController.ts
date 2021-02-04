import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(classToClass(appointments));
  }
}

export default new ProviderAppointmentsController();
