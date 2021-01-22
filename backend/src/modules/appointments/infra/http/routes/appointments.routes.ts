import { Router } from "express";

import AppointmentsController from "@modules/appointments/infra/http/controller/AppointmentsController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post("/", AppointmentsController.create);

export default appointmentsRouter;
