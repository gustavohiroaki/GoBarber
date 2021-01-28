import { Router } from "express";

import ProvidersController from "@modules/appointments/infra/http/controller/ProvidersController";
import ProviderDayAvailabilityController from "@modules/appointments/infra/http/controller/ProviderDayAvailabilityController";
import ProviderMonthAvailabilityController from "@modules/appointments/infra/http/controller/ProviderMonthAvailabilityController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", ProvidersController.index);
appointmentsRouter.get(
  "/:provider_id/month-availability",
  ProviderMonthAvailabilityController.index
);
appointmentsRouter.get(
  "/:provider_id/day-availability",
  ProviderDayAvailabilityController.index
);

export default appointmentsRouter;
