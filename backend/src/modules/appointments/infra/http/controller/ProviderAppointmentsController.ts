import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}

export default new ProviderAppointmentsController();