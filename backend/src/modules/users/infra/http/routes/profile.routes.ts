import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ProfileController from "@modules/users/infra/http/controller/ProfileController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);
profileRouter.get("/", ProfileController.show);
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
    },
  }),
  ProfileController.update
);

export default profileRouter;
