import { Router } from "express";

import ProvidersController from "@modules/appointments/infra/http/controller/ProvidersController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", ProvidersController.index);

export default appointmentsRouter;
