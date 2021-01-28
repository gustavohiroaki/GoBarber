import { Router } from "express";

import AppointmentsController from "@modules/appointments/infra/http/controller/AppointmentsController";
import ProviderAppointmentsController from "@modules/appointments/infra/http/controller/ProviderAppointmentsController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post("/", AppointmentsController.create);
appointmentsRouter.get("/me", ProviderAppointmentsController.index);

export default appointmentsRouter;
