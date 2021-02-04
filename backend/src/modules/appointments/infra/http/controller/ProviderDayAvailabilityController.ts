import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year, day } = req.query;

    const listProvideDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await listProvideDayAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(availability);
  }
}

export default new ProviderDayAvailabilityController();
