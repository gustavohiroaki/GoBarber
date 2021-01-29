import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import AppointmentsController from "@modules/appointments/infra/http/controller/AppointmentsController";
import ProviderAppointmentsController from "@modules/appointments/infra/http/controller/ProviderAppointmentsController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  AppointmentsController.create
);
appointmentsRouter.get("/me", ProviderAppointmentsController.index);

export default appointmentsRouter;
